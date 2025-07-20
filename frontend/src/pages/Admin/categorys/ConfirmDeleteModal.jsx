// src/pages/admin/ConfirmDeleteModal.jsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
<div className="flex items-center gap-1 mb-1 justify-start text-left">
  <FaTrash className=" text-blue-500 " />
  <h2 className="font-semibold text-right">حذف آگهی</h2>
</div>

{/* { selectedAdTitle }    */}
            
            <p className="text-sm text-gray-600 text-right mb-4">
              آیا مطمئن هستید که می‌خواهید آگهی{' '}
              <span className="font-bold "></span> را حذف کنید؟
            </p>
           <div className="flex justify-end gap-4">
        <button
         onClick={() => onCancel(false)}
         className="bg-gray-200 border px-4 py-1 rounded-lg h-[35px] w-[70px] hover:border-blue-400"
        >
        لغو
       </button>
        <button
        onClick={onConfirm}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg h-[35px] w-[70px] hover:bg-blue-600"
       >
    حذف
  </button>
</div>

          </div>
        </div>
  );
};

export default ConfirmDeleteModal;
