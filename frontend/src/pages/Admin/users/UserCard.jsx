// components/UserCard.jsx
import React from "react";
import { FaTrash } from "react-icons/fa";
import moment from "moment-jalaali";

moment.locale("fa");

const UserCard = ({ user, onDeleteClick }) => {
  const BASE_URL = "http://localhost:3500/";

  return (
    <div className="flex items-center dark-bg-myColor justify-between hover:shadow-xl w-full bg-white transition-shadow duration-200 shadow-lg rounded-md pl-4 mb-2 border border-gray-200">

      {/* عکس */}
      <div className="w-1/5 flex justify-center pt-2">
        <img
          src={user.photo ? `${BASE_URL}${user.photo}` : "/default-avatar.png"}
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* نام کاربری */}
      <div className="w-1/5 text-right font-bold text-gray-800">
        {user.username}
      </div>

      {/* ایمیل */}
      <div className="w-1/4 text-right text-sm text-gray-700 truncate">
        {user.email}
      </div>

      {/* تاریخ ساخت */}
      <div className="w-1/4 text-right text-xs text-gray-500">
        تاریخ ایجاد حساب : {moment(user.createdAt).format("jYYYY/jMM/jDD HH:mm")}
      </div>

      {/* آیکن حذف */}
      <div className="w-1/6 flex gap-2 justify-end">
        <button
          onClick={() => onDeleteClick(user._id, user.username)}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
          title="حذف"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default UserCard;



// <div className="bg-white shadow-lg p-6 rounded max-w-md w-full mx-auto mt-6 overflow-hidden">
//       <h2 className="text-lg font-bold mb-3 text-center">افزودن دسته‌بندی جدید</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-3" encType="multipart/form-data">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="عنوان دسته‌بندی"
//           className="border-none ring-0 p-2 focus:ring-1 w-[400px] h-[32px] focus:outline-none focus:ring-blue-400 bg-gray-100 rounded-md placeholder:text-gray-400 text-gray-800"
//         />
//         <p className={`text-red-500 text-sm text-center h-3 ${!titleError ? 'invisible' : ''}`}>
//           {titleError || ' '}
//         </p>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="border-none ring-0 pb-1 w-[400px] h-[32px] focus:outline-none focus:ring-1 focus:ring-blue-400 bg-gray-100 rounded-md placeholder:text-gray-400 text-gray-800"
//         />

//         <div className="w-[145px] h-[125px] border rounded overflow-hidden mx-auto relative">
//           {imagePreview ? (
//             <img
//               src={imagePreview}
//               alt="پیش‌نمایش"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
//               بدون عکس
//             </div>
//           )}
//         </div>

//         <div className="flex gap-2 justify-center">
//           <button
//             type="submit"
//             className="bg-blue-400 text-white py-2 px-4 rounded-xl hover:bg-blue-500 flex items-center justify-center min-w-[100px]"
//             disabled={loading}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
//                 />
//               </svg>
//             ) : (
//               'ثبت دسته‌بندی'
//             )}
//           </button>

//           <button
//             type="button"
//             onClick={handleCancelForm}
//             className="border-gray-400 text-gray-700 w-[125px] h-[40px] font-tracfick px-4 py-2 rounded-xl mx-2 hover:ring-1 bg-gray-100 hover:outline-none hover:ring-blue-400 transition duration-200"
//           >
//             لغو فرم
//           </button>
//         </div>

//         <p className="text-green-600 text-center min-h-[24px]">{success}</p>
//         <p className="text-red-600 text-center min-h-[24px]">{error}</p>
//       </form>
//     </div>




