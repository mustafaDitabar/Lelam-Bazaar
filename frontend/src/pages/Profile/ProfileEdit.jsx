import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { FaCamera } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import defaltpic from "../../photo/5568706.jpg";

const ProfileEdit = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
   const [photoURL, setPhotoURL] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
const [loadingCancel, setLoadingCancel] = useState(false);
const [loadingVerify, setLoadingVerify] = useState(false);
  useEffect(() => {
    if (auth?.userInfo) {
      const { username, email, photo } = auth.userInfo;
      setForm((prev) => ({ ...prev, username, email }));
      setPhotoPreview(photo || "");
    }
  }, [auth]);
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleVerifyPassword = async () => {
    try {
      const token = auth?.accessToken;
      await axios.post(
        "/api/users/verify-password",
        { password: form.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setIsEditable(true);
      setError("");
      setSuccess("رمز عبور تایید شد. اکنون می‌توانید تغییرات را انجام دهید.");
    } catch (err) {
      setError("رمز عبورخالی ویا نادرست است.");
      setIsEditable(false);
      setSuccess("");
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

   // اعتبارسنجی
  if (!form.username.trim()) {
    setError("نام کاربری نمی‌تواند خالی باشد.");
    setLoadingSave(false);
    return;
  }
  if (!form.email.trim()) {
    setError("ایمیل نمی‌تواند خالی باشد.");
    setLoadingSave(false);
    return;
  }
  if (!form.newPassword.trim()) {
    setError("رمز عبور جدید را وارد کنید.");
    setLoadingSave(false);
    return;
  }
  if (!photoFile && !photoPreview) {
    setError("لطفاً یک عکس پروفایل انتخاب کنید.");
    setLoadingSave(false);
    return;
  }
  if (!form.confirmPassword || form.newPassword !== form.confirmPassword) {
    setError("رمز جدید و تکرار آن یکسان نیستند.");
    setLoadingSave(false);
    return;
  }
  try {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    if (form.newPassword) formData.append("password", form.newPassword);
    if (photoFile) formData.append("photo", photoFile);

    const token = auth?.accessToken;
    const { data } = await axios.put("/api/users/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    const updatedAuth = {
      userInfo: {
        _id: data._id,
        username: data.username,
        email: data.email,
        photo: data.photo,
      },
      accessToken: data.token,
    };

    setAuth(updatedAuth);
    localStorage.setItem("chat-user", JSON.stringify(updatedAuth));

    setForm({
      username: data.username,
      email: data.email,
      password: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPhotoPreview(data.photo || "");
    setPhotoFile(null);
    setIsEditable(false);
    setSuccess("پروفایل با موفقیت به‌روزرسانی شد.");
  } catch (err) {
    setError(err.response?.data?.message || "خطا در به‌روزرسانی پروفایل.");
  }
};


  const handleCancel = () => {
    if (auth?.userInfo) {
      const { username, email, photo } = auth.userInfo;
      setForm({
        username,
        email,
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPhotoPreview(photo || "");
      setPhotoFile(null);
      setIsEditable(false);
      setError("");
      setSuccess("");
    }
  };


useEffect(() => {
    if (auth?.userInfo?.photo && typeof auth.userInfo.photo === "string") {
      const serverBaseURL = "http://localhost:3500";
      const url = `${serverBaseURL}/images/${auth.userInfo.photo.split("/").pop()}`;
      setPhotoURL(url);
    } else {
      setPhotoURL(null);
    }
  }, [auth]);

  return (
    <div className="max-w-md bg-white text-black dark:bg-blackbg dark:text-white   mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 text-right">
        <fieldset disabled={!isEditable} className="flex flex-col gap-2 w-full">
          {/* نام کاربری */}
          <div className="flex items-center w-full">
            <label className="min-w-[110px]">نام کاربری :</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
             className="w-full flex-1 bg-gray-100 dark:bg-colorfieldbg rounded-md p-2 text-gray-500  ring-0 focus:ring-1  w-[300px] h-[30px] focus:outline-none focus:ring-blue-300   rounded-md placeholder:text-gray-400 text-gray-500"

            />
          </div>

          {/* ایمیل */}
          <div className="flex items-center w-full">
            <label className="min-w-[110px]">ایمیل کاربر :</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
      className="w-full bg-gray-100 p-2 text-gray-500  ring-0 focus:ring-1  w-[300px] h-[30px] focus:outline-none focus:ring-blue-300   rounded-md placeholder:text-gray-400 text-gray-500"

/>
          </div>

          {/* عکس پروفایل */}
          <div className="flex items-center pr-[240px] w-full ">
            <div className="relative w-[80px] h-[80px]">
              {photoPreview ? (
                <img
                  
                  src={photoURL || defaltpic}
                  
                  alt="عکس"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
                  <FaCamera />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
                <FaCamera className="text-blue-500 w-4 h-4" />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

{/* رمز عبور جدید */}
<div className="flex items-center w-full mb-2">
  <label className="min-w-[110px]">رمز عبور جدید :</label>
  <div className="flex-1 relative">
    <input
      type={showNewPassword ? "text" : "password"}
      name="newPassword"
      value={form.newPassword}
      onChange={handleChange}
      className="w-full bg-gray-100 rounded-md p-2 text-gray-500 pr-10 ring-0 focus:ring-1  w-[300px] h-[30px] focus:outline-none focus:ring-blue-300   rounded-md placeholder:text-gray-400 text-gray-500"

/>
    <div
      className="absolute inset-y-0 right-2 text-blue-400 flex items-center cursor-pointer"
      onClick={() => setShowNewPassword(prev => !prev)}
    >
      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </div>
  </div>
</div>

 {/* تکرار رمز عبور */}
<div className="flex items-center w-full mb-2">
  <label className="min-w-[110px]">تکرار رمز عبور :</label>
  <div className="flex-1 relative">
    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      value={form.confirmPassword}
      onChange={handleChange}
      className="w-full bg-gray-100 rounded-md p-2 text-gray-500 pr-10 ring-0 focus:ring-1  w-[300px] h-[30px] focus:outline-none focus:ring-blue-300   rounded-md placeholder:text-gray-400 text-gray-500"

/>
    <div
      className="absolute inset-y-0 right-2 flex text-blue-400 items-center cursor-pointer"
      onClick={() => setShowConfirmPassword(prev => !prev)}
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </div>
  </div>
</div>

        {/* دکمه‌ها */}
<div className="flex justify-end pb-2 gap-3 mt-2">
  {/* دکمه لغو */}
  <button
    type="button"
    className="btn bg-gray-200 text-gray-700 hover:border-blue-500 rounded-lg w-[130px] flex items-center justify-center gap-2"
    onClick={() => {
      setLoadingCancel(true);
      handleCancel();
      setTimeout(() => setLoadingCancel(false), 1500); // نمونه تأخیری
    }}
    disabled={!isEditable || loadingCancel}
  >
    {loadingCancel ? (
    <svg
      className="animate-spin h-5 w-5 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-100"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="60"
      />
    </svg>
    ) : (
      "لغو"
    )}
  </button>

  {/* دکمه ذخیره تغییرات */}
  <button
    type="submit"
    className="btn text-white bg-blue-500 hover:bg-blue-600 rounded-lg w-[130px] flex items-center justify-center gap-2"
    onClick={(e) => {
      setLoadingSave(true);
      handleSubmit(e);
      setTimeout(() => setLoadingSave(false), 1500); // نمونه تأخیری
    }}
    disabled={!isEditable || loadingSave}
  >
    {loadingSave ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-100"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="60"
      />
    </svg>
    ) : (
      "ذخیره تغییرات"
    )}
  </button>
</div>


        <div className="border-t pt-1 border-gray-200">
          <p className="text-gray-400">برای تغییر پروفایل رمز عبور کنونی را وارد کنید</p>
        </div>
        </fieldset>
 
{/* رمز عبور کنونی */}
<div className="flex items-center w-full  mt-2">
  <label className="min-w-[110px] text-gray-500">رمز عبور کنونی:</label>
  <div className="flex-1 relative">
    <input
      type={showCurrentPassword ? "text" : "password"}
      name="password"
      placeholder="برای بروزرسانی اطلاعات"
      value={form.password}
      onChange={handleChange}
      className="w-full bg-gray-100 rounded-md p-2 text-gray-500 pr-10 ring-0 focus:ring-1  w-[300px] h-[30px] focus:outline-none focus:ring-blue-300   rounded-md placeholder:text-gray-400 text-gray-500"
    />
    <div
      className="absolute inset-y-0 right-2 flex text-blue-400 items-center cursor-pointer"
      onClick={() => setShowCurrentPassword(prev => !prev)}
    >
      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </div>
  </div>
</div>

        <div className="flex justify-end mt-2">
<div className="flex justify-end mt-2">
<button
  type="button"
  onClick={async () => {
    setLoadingVerify(true);
    await handleVerifyPassword();
    setLoadingVerify(false);
  }}
  disabled={loadingVerify}
  className="flex items-center justify-center gap-2 min-w-[130px]  h-[37px]  py-1 rounded-lg bg-blue-500 font-bold text-white hover:bg-blue-600 transition-colors duration-200 disabled:opacity-60"
>
  {loadingVerify ? (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-100"
        cx="12"
        cy="12"
        r="10"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="60"
      />
    </svg>
  ) : (
    "بررسی رمز عبور"
  )}
</button>


</div>


        </div>

        {/* پیام موفقیت یا خطا */}
        {(error || success) && (
          <div
            className="mt-1 mb-2 p-2 text-center rounded-md"
            style={{
              backgroundColor: error ? "#fee2e2" : "#dcfce7",
              color: error ? "#b91c1c" : "#166534",
            }}
          >
            {error || success}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileEdit;
