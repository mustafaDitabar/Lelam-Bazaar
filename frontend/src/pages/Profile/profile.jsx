import LogoutButton from "../../components/sidebar/LogoutButton";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { IoChatboxSharp } from "react-icons/io5";
import { BiSolidAddToQueue } from "react-icons/bi";
import ProfileEdit from "./ProfileEdit";
import defaltpic from "../../photo/5568706.jpg";
import AllAdd from "./Add/AllAdd";
const Profile = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { auth } = useContext(AuthContext);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    if (auth?.userInfo?.photo && typeof auth.userInfo.photo === "string") {
      const serverBaseURL = "http://localhost:3500";
      const url = `${serverBaseURL}/images/${auth.userInfo.photo.split("/").pop()}`;
      setPhotoURL(url);
    } else {
      setPhotoURL(null);
    }
  }, [auth]);

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <div className="flex bg-white text-black dark:bg-blackbg dark:text-colorwhite1  ">
            <Sidebar />
            <div className="flex-grow h-full ">
              <MessageContainer />
            </div>
          </div>
        );
      case "favorites":
        return (
          <div className="pr-4 pt-2 bg-white text-black dark:bg-blackbg dark:text-colorwhite1  ">
            <h3 className="font-bold mb-2 text-right" >علاقه‌مندی‌ها</h3>
            
          </div>
        );
      case "ads":
        return (
          <div className="pr-4 pt-2 bg-white text-black dark:bg-blackbg dark:text-colorwhite1 ">
            <h2 className=" font-bold mb-2 text-right">آگهی‌ها</h2>
                        <AllAdd/>
          </div>
        );
      case "profile":
        return (
          <div>
            <h2 className=" font-bold mb-2 text-right pr-4 pt-2 bg-white text-black dark:bg-blackbg dark:text-colorwhite1  ">پروفایل</h2>

            <ProfileEdit />
          </div>
        );
      default:
        return <p>لطفاً یک گزینه را انتخاب کنید.</p>;
    }
  };

  return (
    <div className=" w-[1260px] flex bg-white text-center h-[calc(100vh-52px)] bg-white text-black dark:bg-blackbg dark:text-colorwhite1  pt-2 overflow-hidden">
      {/* منوی سمت راست ثابت */}
      <div className="fixed right-0 top-0 h-screen text-center bg-white text-black dark:bg-blackbg dark:text-colorwhite1   items-center w-[250px] border-l border-slate-500 bg-white flex flex-col items-center pt-4 pb-4 z-50">
        <div className="gap-2  pl-12 pt-[50px] pr-12 border-b border-gray-400">
          <img
            className="rounded-full bg-red-400 h-[100px]  w-[100px]"
            alt="تصویر"
            src={photoURL || defaltpic}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/defaultAvatar.png";
            }}
          />
          <div className=" mb-2 pb-1 w-full text-center">
            <span className="text-base font-bold dark:text-white text-gray-800">
              {auth?.userInfo?.username || "کاربر"}
            </span>
          </div>
        </div>

       <div className="flex-1 items-right flex flex-col gap-1 pb-12 mb-8 pt-0  justify-center">
    
     <div className="bg-white text-black dark:bg-blackbg dark:text-colorwhite1  "> <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="chat" label="گفتگو" icon={<IoChatboxSharp />}  /></div>
      <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="favorites" label="علاقه‌مندی‌ها" icon={<BsBookmarkHeartFill className="h-4 w-4" />} />
      <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="ads" label="آگهی‌ها" icon={<BiSolidAddToQueue className="h-5 w-5" />} />
      <TabButton activeTab={activeTab} setActiveTab={setActiveTab} tab="profile" label="پروفایل" icon={<IoPerson className="h-4 w-4" />} />
  
  </div>

        <LogoutButton />
      </div>

      {/* محتوای اصلی با marginRight برابر با عرض منو */}
      <div className="flex-grow h-screen overflow-auto bg-white text-black dark:bg-blackbg dark:text-colorwhite1  " style={{ marginRight: "250px" }}>
        {renderContent()}
      </div>
    </div>
  );
};

const TabButton = ({ activeTab, setActiveTab, tab, label, icon }) => (
 <div
  className={`flex flex-col w-[195px] h-[40px] cursor-pointer p-2 pr-8 bg-white text-black  dark:text-white dark:bg-blackbg   rounded-xl ${
    activeTab === tab ? "border-blue-500 dark:text-colorprimary  text-blue-500 dark:bg-blackbg " : "border-transparent  text-black-400"
  }`}
  style={{ borderWidth: "1.5px" }}
  onClick={() => setActiveTab(tab)}
>
  <span className="flex flex-row-reverse items-center justify-end gap-2 w-full text-right font-semibold">
    {label}
    {icon}
  </span>
</div>

);

export default Profile;


// import LogoutButton from "../../components/sidebar/LogoutButton";
// import Sidebar from '../../components/sidebar/Sidebar';
// import MessageContainer from '../../components/messages/MessageContainer';
// import { AuthContext } from '../../context/AuthContext';
// import { useContext, useEffect, useState } from "react";
// import { IoPerson } from "react-icons/io5";
// import { BsBookmarkHeartFill } from "react-icons/bs";
// import { IoChatboxSharp } from "react-icons/io5";
// import { BiSolidAddToQueue } from "react-icons/bi";
// import ProfileEdit from "./ProfileEdit";
// import defaltpic from "../../photo/5568706.jpg";
// import defaultProfile from '../../assets/profile.png'; 

// const Profile = ({ conversation }) => {
//   const [activeTab, setActiveTab] = useState("chat");
//   const { auth } = useContext(AuthContext);
//   const [photoURL, setPhotoURL] = useState(null);

//   useEffect(() => {
//     if (auth?.userInfo?.photo && typeof auth.userInfo.photo === "string") {
//     const serverBaseURL = 'http://localhost:3500';
// const url = auth.userInfo.photo
//   ? `${serverBaseURL}/images/${auth.userInfo.photo.split('/').pop()}`
//   : defaultProfile;

//  setPhotoURL(url);
    
//     } else {
//       setPhotoURL(null);
//     }
//   }, [auth]);

//   const renderContent = () => {
//     switch (activeTab) {
//       case "chat":
//         return (
          

//   <div className="overflow-hidden ">
//             <div className="flex items-center justify-center h-full">
//               <div className="flex p-2 w-screen  gap-2 overflow-hidden bg-white-100 bg-clip-padding bg-opacity-1">
//                 <Sidebar />
//                 <div className="flex-grow h-full">
//                   <MessageContainer />
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case "favorites":
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-2">علاقه‌مندی‌ها</h2>
//             <ul>
//               <li>مورد علاقه ۱</li>
//               <li>مورد علاقه ۲</li>
//             </ul>
//           </div>
//         );
//       case "profile":
//         return (
//         <div className="text-center justify-center">
//             <ProfileEdit />
//           </div>
//         );
//       case "ads":
//         return (
//           <div>
//             <h2 className="text-xl font-bold mb-2">آگهی‌ها</h2>
//             <p>در این بخش آگهی‌های شما نمایش داده می‌شود.</p>
//           </div>
//         );
//       default:
//         return <p>لطفاً یک گزینه را انتخاب کنید.</p>;
//     }
//   };

//   return (
//     <div className=" h-[calc(100vh-50px)] w-screen flex items-center justify-center bg-white-100">
//       <div className="flex w-screen h-full gap-3 overflow-hidden bg-white-100">
//         {/* منوی سمت راست */}
//         <div className="border-l border-slate-500 items-center min-w-[245px] max-w-[450px] flex flex-col pt-4 pb-4">
//           <div className="gap-2 mb-4 pl-12 pr-12 border-b border-gray-400">
//             <img
//               className="rounded-full bg-red-400 h-[100px] w-[100px]"
//               alt="تصویر"
//               src={photoURL || defaltpic}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "/assets/defaultAvatar.png";
//               }}
//             />
//             <div className="mt-2 mb-2 pb-1 w-full text-center">
//               <span className="text-base font-bold text-gray-800">
//                 {auth?.userInfo?.username || "کاربر"}
//               </span>
//             </div>
//           </div>

//           {/* منوی تب‌ها */}
//           <div className="flex flex-col gap-1 w-full  items-center ">



//             <div
//               className={`flex flex-col w-[195px] h-[40px] cursor-pointer  p-2 pl-11 rounded-md ${
//                 activeTab === "chat" ? "border-blue-500 text-blue-500" : "border-transparent text-black-400"
//               }`}
//               style={{ borderWidth: '1.5px' }}
//               onClick={() => setActiveTab("chat")}
//             >
//               <span className="flex flex-row-reverse items-center font-semibold pl-12 gap-2">
//                 گفتگو
//                 <IoChatboxSharp />
//               </span>
//             </div>


           



//             <div
//               className={`flex flex-col w-[195px] h-[40px] cursor-pointer  pt-2 pl-7 rounded-md ${
//                 activeTab === "favorites" ? "border-blue-500 text-blue-500" : "border-transparent text-black-400"
//               }`}
//               style={{ borderWidth: '1.5px' }}
//               onClick={() => setActiveTab("favorites")}
//             >
//               <span className="flex flex-row-reverse items-center ml-4 font-semibold pr-1 gap-2">
//                 علاقه‌مندی‌ها
//                 <BsBookmarkHeartFill className="h-4 w-4" />
//               </span>
//             </div>





//             <div
//               className={`flex flex-col w-[195px] h-[40px] cursor-pointer  pt-2 pl-11 rounded-md ${
//                 activeTab === "ads" ? "border-blue-500 text-blue-500" : "border-transparent text-black-400"
//               }`}
//               style={{ borderWidth: '1.5px' }}
//               onClick={() => setActiveTab("ads")}
//             >
//               <span className="flex flex-row-reverse items-center font-semibold pl-9 gap-2">
//                 آگهی‌ها
//                 <BiSolidAddToQueue className="h-5 w-5" />
//               </span>
//             </div>





//             {/* <div
//               className={`flex flex-col w-[195px] h-[40px] cursor-pointer  p-2 pl-11 rounded-md ${
//                 activeTab === "chat" ? "border-blue-500 text-blue-500" : "border-transparent text-black-400"
//               }`}
//               style={{ borderWidth: '1.5px' }}
//               onClick={() => setActiveTab("chat")}
//             >
//               <span className="flex flex-row-reverse items-center font-semibold pl-12 gap-2">
//                 گفتگو
//                 <IoChatboxSharp />
//               </span>
//             </div> */}

//             <div
//               className={`flex flex-col w-[195px] h-[40px] cursor-pointer  pl-8 rounded-md ${
//                 activeTab === "profile" ? "border-blue-500  text-blue-500" : "border-transparent text-black-400"
//               }`}
//               style={{ borderWidth: '1.5px' }}
//               onClick={() => setActiveTab("profile")}
//             >
//               <span className="flex flex-row-reverse items-center pt-1 font-semibold pl-12 gap-2">
//                 پروفایل
//                 <IoPerson className="h-4 w-4" />
//               </span>
//             </div>



//           </div>

//           <LogoutButton />
//         </div>

//         {/* محتوای اصلی (سمت چپ) */}
//         <div className="flex-grow overflow-auto">
//           <div className="flex-1 h-full flex flex-col shadow rounded-lg">
//             {renderContent()}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;
