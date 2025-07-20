import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import DrpoDown from "./DropDown";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
 const BACKEND_URL = "http://localhost:3500"; // آدرس سرور بک‌اندت

const getImageSrc = (photo) => {
  if (typeof photo === "string" && photo.trim() !== "") {
    if (photo.startsWith("/uploads/images/")) {
      return `${BACKEND_URL}${photo}`;
    }
    return photo; // لینک کامل مثل عکس گوگل
  }
  return "../../../src/assets/m.jpg";
};



const profilePic = selectedConversation?.user?.photo || selectedConversation?.photo;

const location = useLocation();
const conversationId = new URLSearchParams(location.search).get("conversationId");






  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

console.log(setSelectedConversation,"خود کانورسیشن");
useEffect(() => {
  if (!conversationId || selectedConversation?._id === conversationId) return;

console.log(conversationId,"ایدی کانوسیشن ");

  const fetchConversation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-user"));
      const token = user?.accessToken;

      const res = await axios.get(`/api/conversations/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSelectedConversation(res.data);
    } catch (err) {
      console.error("Failed to load conversation by ID", err);
    }
  };

  fetchConversation();
}, [conversationId, selectedConversation?._id]);








  return (
    
    <div className=" flex flex-col bg-white text-black dark:bg-blackbg  dark:text-colorwhite  ">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
<div className="flex flex-col w-full h-[calc(100vh-55px)] ">
  {/* Header */}
  <div className="w-full bg-blue-400 py-2 mb-2 flex items-center justify-between rounded-md">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full overflow-hidden">
        <img
          alt="تصویر"
          src={getImageSrc(profilePic)}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/defaultAvatar.png";
          }}
        />
      </div>
      <span className="text-gray-800 font-bold">
        {selectedConversation?.user?.username || selectedConversation?.username }
      </span>
    </div>
    <DrpoDown conversation={selectedConversation} />
  </div>

  {/* Messages + Input */}
  <div className="flex flex-col flex-1 overflow-hidden">
    <div className="flex-1 overflow-auto">
      <Messages />
    </div>
    <div className="mt-2">
      <MessageInput />
    </div>
  </div>
</div>

         
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { auth } = useAuthContext();
  return (
    <div className="flex items-center justify-center text-center pt-[200px]">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2">
        <p>خوش آمدید! 👋 {auth?.userInfo?.username } ❄</p>
        <p>شخصی را انتخاب و پیام را آغاز کنید</p>
        <TiMessages className="text-3xl md:text-6xl text-center text-blue-300" />
      </div>
    </div>
  );
};





// import { useEffect } from "react";
// import useConversation from "../../zustand/useConversation";
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";
// import { TiMessages } from "react-icons/ti";
// import { useAuthContext } from "../../context/AuthContext";
// import DrpoDown from "./DropDown";
// import pic from "../../../src/assets/m.jpg";

// const MessageContainer = () => {
// 	const { selectedConversation, setSelectedConversation } = useConversation();

// const getImageSrc = (photo) => {
//   if (photo?.data && photo?.contentType) {
//     // تبدیل آرایه بایت به رشته
//     const binary = photo.data.data.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
//     const base64String = btoa(binary);
//     return `data:${photo.contentType};base64,${base64String}`;
//   }
//   return pic; // عکس پیش‌فرض
// };



// const profilePic = selectedConversation?.photo;
//   useEffect(() => {

		
// 		// cleanup function (unmounts)
// 		return () => setSelectedConversation(null);
// 	}, [setSelectedConversation]);

// 	return (
// 		<div className='flex-1 h-screen flex flex-col' >
// 			{!selectedConversation ? (
// 				<NoChatSelected />
// 			) : (
// 				<>
// <div className="w-full  ">
//   <div className="w-full bg-blue-400 px-4 py-2 mb-2 flex items-center justify-between rounded-md">
//     <div className="flex items-center gap-3">
//       <div className="w-9 h-9 rounded-full overflow-hidden">
//   <img
//     alt="تصویر"
//     src={getImageSrc(profilePic)}
//     className="w-full h-full object-cover"
//     onError={(e) => {
//       e.target.onerror = null;
//       e.target.src = "/assets/defaultAvatar.png";
//     }}
//   />
// </div>

//       <span className="text-gray-800 font-bold">
//         {selectedConversation.username}
//       </span>
//     </div>

//      <DrpoDown conversation={selectedConversation} />
//   </div>
// </div>


					
// 					<Messages />
// 					<MessageInput />
// 				</>
// 			)}
// 		</div>
// 	);
// };



// export default MessageContainer;



// const NoChatSelected = () => {
// 	const { auth } = useAuthContext();
// 	return (
// 		<div className='flex items-center justify-center text-center  h-screen'>
//   <div className='px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2'>
//     <p>
//       خوش آمدید! 👋 {auth.username} ❄
//     </p>
//     <p>شخصی را انتخاب و پیام را آغاز کنید</p>
//     <TiMessages className='text-3xl md:text-6xl text-center text-blue-300' />
//   </div>
// </div>

// 	);
// };
