import React, { useContext, useState } from 'react';
import axios from '../../../api/axios';
import { AuthContext } from '../../../context/AuthContext';

const ConfirmModal = ({ ad, onClose }) => {
  const { auth } = useContext(AuthContext);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const handleAccept = async () => {
    setLoadingAccept(true);
    try {
      await axios.put(`/api/adds-ADMIN/approve/${ad._id}`, {}, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      alert('✅ آگهی تأیید شد.');
      onClose();
    } catch (err) {
      console.error('خطا در تأیید:', err);
    } finally {
      setLoadingAccept(false);
    }
  };

  const handleReject = async () => {
    setLoadingReject(true);
    try {
      await axios.delete(`/api/adds-ADMIN/${ad._id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      alert('❌ آگهی حذف شد.');
    //  window.location.reload(); // ⬅️ صفحه ریفرش شود بعد از رد

      onClose();
    } catch (err) {
      console.error('خطا در حذف:', err);
    } finally {
      setLoadingReject(false);
    }
  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-[700px] text-right relative font-trafick rtl">
        
        {/* لایه قابل اسکرول */}
        <div className="p-8 space-y-4 max-h-[90vh] overflow-y-auto">

          {/* دکمه بستن */}
      <div
        onClick={onClose}
        className="absolute top-2 left-5 h-[30px] w-[30px] flex hover:bg-red-400 items-center justify-center rounded-md cursor-pointer"
      >
        <span className="text-gray-700 text-2xl leading-none">×</span>
      </div>


          <h2 className="text-xl font-bold text-right mb-4">جزئیات آگهی</h2>

          <div className="grid grid-cols-[100px_auto] gap-y-4 gap-x-2 items-start">
            <strong className="text-gray-700">عنوان:</strong>
            <span className="text-gray-800">{ad.title}</span>

            <strong className="text-gray-700">توضیحات:</strong>
            <div
              className="text-gray-800"
              dangerouslySetInnerHTML={{ __html: ad.description }}
            />

            <strong className="text-gray-700">قیمت:</strong>
            <span className="text-gray-800">{ad.price} افغانی</span>

            <strong className="text-gray-700">شماره تماس:</strong>
            <span className="text-gray-800">{ad.phoneNumber}</span>

            <strong className="text-gray-700">موقعیت:</strong>
            <span className="text-gray-800">{ad.location}</span>

            <strong className="text-gray-700">دسته‌بندی:</strong>
            <span className="text-gray-800">{ad.categoryId?.title || '---'}</span>

            <strong className="text-gray-700">وضعیت:</strong>
            <span className="text-gray-800">
              {ad.isAccepted ? 'تأیید شده' : 'در انتظار تایید'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-4">
            {ad.imagesURLs?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`ad-${i}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>

          <div className="flex justify-end gap-4 pt-6">
            {/* دکمه رد */}
            <button
              onClick={handleReject}
              disabled={loadingReject || loadingAccept}
              className="bg-gray-200 text-black border px-4 py-2 w-[100px] rounded-lg hover:border-blue-600 flex items-center justify-center"
            >
              {loadingReject ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
              ) : (
                'رد'
              )}
            </button>

            {/* دکمه تایید */}
            <button
              onClick={handleAccept}
              disabled={loadingAccept || loadingReject}
              className="bg-blue-400 text-white w-[100px] px-4 py-2 rounded-lg hover:bg-blue-500 flex items-center justify-center"
            >
              {loadingAccept ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
              ) : (
                'تأیید'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
