import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { BiSolidImage } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null); // اضافه شده: نگه‌داشتن عکس
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message && !image) return; // اگر هیچ چیزی نباشد ارسال نکن

    await sendMessage({  message, image }); // ارسال همزمان متن و تصویر (اگر باشد)
    setMessage(""); // پاک‌کردن پیام
    setImage(null);  // پاک‌کردن عکس
  };

  const sendImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result); // فقط ذخیره تصویر، ارسال در handleSubmit
    };
  };

  return (
    <form className='px-2 my-1 bg-white text-black dark:bg-gray-800 dark:text-white  ' onSubmit={handleSubmit}>
      <div className="relative w-full">

        {/* آیکن عکس و انتخاب فایل */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer group">
          <label htmlFor="file">
            <BiSolidImage className="text-blue-400 h-6 w-6 group-hover:text-blue-600 transition" />
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept="image/jpg, image/png, image/jpeg, image/gif"
              onChange={sendImage}
            />
          </label>
        </div>

        {/* ورودی پیام متنی */}
        <input
          dir="rtl"
          type="text"
          className="input rounded-md p-2 w-full pr-12 pl-10 border border-transparent
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            bg-gray-200 text-gray-500 relative z-10"
          placeholder="ارسال پیام"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* دکمه ارسال */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BiSend className="text-blue-500 h-6 w-6" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
