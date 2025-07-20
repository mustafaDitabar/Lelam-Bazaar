import React, { useEffect, useState, useContext } from "react";
import defaltpic from "../../photo/5568706.jpg";
import Chart from "../Chart/Chart-Category"
import AllAccsepted from "./AccseptOrReject/AllAccsepted"
import { IoStatsChart } from "react-icons/io5";
import Profile from "./profile/Profile";
import { TbCategoryFilled } from "react-icons/tb";

import {
  FaUserCog,
  FaBullhorn,
  FaUsers,
  FaCheckCircle,
  
} from "react-icons/fa";
import AllAds from "./adds/AllAds";
import AllUsers from "./users/AllUsers";
import Categories from "./categorys/category";
import { AuthContext } from "../../context/AuthContext";
import LogoutButton from "../../components/sidebar/LogoutButton";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("namodar");
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
      case "namodar":
        return <Chart/>;
      case "ads":
        return <AllAds />;
      case "users":
        return <AllUsers />;
      case "approvals":
        return <div>  <AllAccsepted/></div>
      case "categores":
        return <Categories />;
      case "profile":
        return <Profile/>
      default:
        return <div>یکی از تب‌ها را انتخاب کنید.</div>;
    }
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-xl dark-bg-myColor transition-colors duration-200 font-bold text-right ${
        activeTab === id
          ? "text-blue-500 border-blue-500"
          : "text-gray-700 border-transparent"
      }`}
      style={{ borderWidth: "1.5px" }}
    >
      <Icon className="text-xl ml-3" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="h-screen flex overflow-hidden dark-bg-myColor font-traffic">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow p-6 border-l border-gray-200 flex flex-col justify-between">
        <div> 
          <div className="flex flex-col items-center border-b border-gray-300 mb-10">
            <img
              className="rounded-full bg-red-400 h-[90px] w-[90px]"
              alt="تصویر"
              src={photoURL || defaltpic}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/defaultAvatar.png";
              }}
            />
            <div className="text-right mt-2 mb-2">
              <p className="text-lg font-semibold text-gray-800 mr-2">
                {auth?.userInfo?.username || "ادمین"}
              </p>
            </div>
          </div>

          <nav className="flex flex-col space-y-3 text-right mt-3 text-sm">
            <TabButton id="namodar" icon={IoStatsChart} label="نمودار ها" />
            <TabButton id="ads" icon={FaBullhorn} label="آگهی‌ها" />
            <TabButton id="categores" icon={TbCategoryFilled} label="ایجاد دسته بندی" />
            <TabButton id="users" icon={FaUsers} label="کاربران" />
            <TabButton id="approvals" icon={FaCheckCircle} label="تأیید آگهی‌ها" />
            <TabButton id="profile" icon={FaUserCog} label="پروفایل ادمین" />
          </nav>
          <div className=" text-center  pl-[85px]  justify-center content-center mt-11">
            <LogoutButton/>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto h-screen  scrollbar-thin-custom">
        <h1 className="text-1xl font-bold text-gray-800 mb-4 text-right border-b pb-1 border-gray-300">
          {(() => {
            switch (activeTab) {
              case "namodar":
                return "نمودار ها ";
              case "ads":
                return "آگهی‌ها";
              case "users":
                return "کاربران";
              case "categores":
                return "ایجاد دسته بندی";
              case "approvals":
                return "تأیید آگهی‌ها";
              case "profile":
                return "پروفایل ادمین";
              default:
                return "پنل مدیریت";
            }
          })()}
        </h1>

        <div>{renderContent()}</div>
      </main>
    </div>
  );
};

export default AdminPanel;
