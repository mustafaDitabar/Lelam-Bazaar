import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

const PlaceOrder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [location, setLocation] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const imageInputRef = useRef();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // لیست ولایات
  const provinces = [
    "کابل", "هرات", "قندهار", "مزارشریف", "ننگرهار", "بلخ", "کندز", "غزنی",
    "بدخشان", "پروان", "لغمان", "پکتیا", "هلمند", "بغلان", "کاپیسا", "فراه",
    "تخار", "زابل", "لوگر", "فاریاب", "بامیان", "وردک", "خوست", "نورستان",
    "اروزگان", "دایکندی", "پنجشیر", "سمنگان", "جوزجان", "سرپل", "بادغیس",
    "غور", "نیمروز",
  ];

  // واکشی دسته‌بندی‌ها از سرور
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosPrivate.get("/api/categories");
        setCategories(res.data); 
        console.log(res.data,"دسته بندی");

      } catch (err) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", err);
      }
    };
    fetchCategories();
  }, [axiosPrivate]);

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setPhoneNumber("");
    setSelectedCategory(null);
    setLocation("");
    setImageFiles([]);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // اعتبارسنجی اولیه
    if (!/^07\d{8}$/.test(phoneNumber)) {
      alert("شماره تماس باید با 07 شروع شود و 10 رقم باشد.");
      return;
    }
    if (
      !title ||
      !selectedCategory ||
      !description ||
      !phoneNumber ||
      !location ||
      !price ||
      imageFiles.length === 0
    ) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    // ساخت FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("phoneNumber", phoneNumber);
    formData.append("categoryId", selectedCategory._id); // ارسال ObjectId
    formData.append("location", location);
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await axiosPrivate.post("/api/add-i", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        alert("آگهی با موفقیت ثبت شد!");
        handleReset();
        navigate("/");
      } else {
        alert("خطا در ثبت آگهی");
      }
    } catch (err) {
      console.error("خطا:", err);
      alert("خطا در ارسال به سرور");
    }
  };

  return (
    <div className="h-[calc(100vh-50px)] overflow-hidden">
      <div className="text-center pt-6 font-bold">ایجاد آگهی جدید</div>
      <div className="rtl flex flex-col sm:flex-row justify-center gap-3 pt-2 sm:pt-6 min-h-[88vh]">
        <form
          onSubmit={handleSubmit}
          className="rtl flex flex-col gap-4 w-full sm:max-w-[480px]"
        >
          {/* عنوان */}
          <div className="rtl flex flex-row-reverse items-center gap-1">
            <input
              type="text"
              placeholder="عنوان آگهی"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-100 rounded-md w-[400px] h-[30px] p-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
            <label className="text-gray-500">عنوان آگهی :</label>
          </div>

          {/* دسته‌بندی */}
          <div className="rtl flex items-center">
            <label className="text-gray-500 ml-1">دسته بندی :</label>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              <div className="relative w-[400px]">
                <Listbox.Button className="bg-gray-100 p-2 rounded-lg w-full text-right flex justify-between items-center">
                  <span className="truncate">
                    {selectedCategory?.title || "انتخاب دسته"}
                  </span>
                  <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white shadow-lg mt-1 rounded-lg z-10 max-h-60 overflow-auto w-full">
                  {categories.map((cat) => (
                    <Listbox.Option
                      key={cat._id}
                      value={cat}
                      className={({ active }) =>
                        `cursor-pointer p-2 ${active ? "bg-blue-100" : ""}`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={selected ? "font-medium" : ""}
                          >{cat.title}</span>
                          {selected && (
                            <CheckIcon className="w-4 h-4 inline text-blue-500 ml-2" />
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* توضیحات */}
          <div className="rtl flex items-start gap-1">
            <label className="text-gray-500">توضیحات :</label>
            <input
              type="text"
              placeholder="توضیحات"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-100 rounded-md w-[410px] h-[30px] p-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* تماس */}
          <div className="rtl flex items-center gap-1">
            <label className="text-gray-500">نمبر تماس :</label>
            <input
              type="text"
              maxLength="10"
              placeholder="07XXXXXXXX"
              value={phoneNumber}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d{0,10}$/.test(v)) setPhoneNumber(v);
              }}
              className="bg-gray-100 rounded-md w-[400px] h-[30px] p-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* ولایت */}
          <div className="rtl flex items-center gap-1">
            <label className="text-gray-500">ولایت :</label>
            <Listbox value={location} onChange={setLocation}>
              <div className="relative w-[400px]">
                <Listbox.Button className="bg-gray-100 p-2 rounded-lg w-full text-right flex justify-between items-center">
                  <span className="truncate">{location || "انتخاب ولایت"}</span>
                  <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                </Listbox.Button>
                <Listbox.Options className="absolute bg-white shadow-lg mt-1 rounded-lg z-10 max-h-60 overflow-auto w-full">
                  {provinces.map((prov) => (
                    <Listbox.Option
                      key={prov}
                      value={prov}
                      className={({ active }) =>
                        `cursor-pointer p-2 ${active ? "bg-blue-100" : ""}`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={selected ? "font-medium" : ""}>
                            {prov}
                          </span>
                          {selected && (
                            <CheckIcon className="w-4 h-4 inline text-blue-500 ml-2" />
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {/* قیمت */}
          <div className="flex items-center">
            <label className="text-gray-500 ml-3">قیمت :</label>
            <input
              type="number"
              placeholder="قیمت"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-100 rounded-md w-[400px] h-[30px] p-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* عکس */}
          <div className="rtl flex items-center gap-1">
            <label className="text-gray-500 ml-3">عکس :</label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              required
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              className="bg-gray-100 rounded-md w-[400px] h-[30px] p-2 focus:ring-1 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* دکمه‌ها */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-100 text-gray-700 w-[125px] h-[40px] rounded-xl mx-2 hover:ring-1 hover:ring-blue-400 transition duration-200"
            >
              لغو آگهی
            </button>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white w-[125px] h-[40px] rounded-xl mx-2 transition duration-200"
            >
              ارسال آگهی
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
