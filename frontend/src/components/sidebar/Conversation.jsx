import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";


const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();

  const currentUser = JSON.parse(localStorage.getItem("chat-user"));
  const currentUserId = currentUser?.userInfo?.userId || currentUser?._id;
  const otherUserId = conversation.user?._id; // ✅ اصلاح شده

  const isOnline = onlineUsers.includes(otherUserId?.toString());
  // const otherUserId = conversation._id;
  // const isOnline = onlineUsers.includes(otherUserId?.toString());

const BACKEND_URL = "http://localhost:3500"; // آدرس سرور بک‌اندت

const getImageSrc = (photo) => {
  if (typeof photo === "string" && photo.trim() !== "") {
    if (photo.startsWith("/uploads")) {
      return `${BACKEND_URL}${photo}`;
    }
    return photo; // لینک کامل مثل عکس گوگل
  }
  return "/assets/defaultAvatar.png";
};


  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-400 bg-white text-black dark:bg-gray-800 dark:text-white   rounded p-1 py-0.5 cursor-pointer
        ${isSelected ? "bg-blue-400" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-9 rounded-full relative">
            <img
              alt="تصویر"
              src={getImageSrc(conversation.user?.photo)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/defaultAvatar.png";
              }}
            />
            <span
              className={`absolute bottom-1 right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? "bg-green-600" : "bg-gray-300"
              }`}
            ></span>
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="flex gap-3 justify-between">
            <p className="font-serif text-gray-600"> {conversation.user?.username}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="w-full h-px bg-gray-300 my-0" />}
    </>
  );
};

export default Conversation;

