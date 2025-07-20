import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { auth } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === auth?.userInfo?._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-400" : "bg-gray-300";
  const shakeClass = message.shouldShake ? "shake" : "";

  const BACKEND_URL = "http://localhost:3500";

  const getImageSrc = (photo) => {
    if (typeof photo === "string" && photo.trim() !== "") {
      if (photo.startsWith("/uploads")) {
        return `${BACKEND_URL}${photo}`;
      }
      return photo;
    }
    return "/assets/defaultAvatar.png";
  };

  const profilePic = fromMe
    ? getImageSrc(auth.userInfo.photo)
    : getImageSrc(selectedConversation?.photo);
  const isBase64Image = message.message?.startsWith("data:image/");

  return (
    <div className={`bg-white text-black dark:bg-gray-800 dark:text-white   chat ${chatClassName} ${shakeClass}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full overflow-hidden">
          <img
            src={profilePic}
            alt="تصویر پروفایل"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/defaultAvatar.png";
            }}
          />
        </div>
      </div>

      <div className={`chat-bubble ${bubbleBgColor} text-gray-700`}>
        {/* ✅ نمایش عکس از message.image (آدرس) */}
        {message.image ? (
          <img
            src={getImageSrc(message.image)}
            alt="عکس پیام"
            className="max-w-xs max-h-60 rounded-md"
          />
        ) : (
          <div>{message.message}</div>
        )}

        <div className="chat-footer opacity-50 flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;