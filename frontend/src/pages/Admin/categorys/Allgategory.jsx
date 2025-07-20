// src/pages/admin/CreateCategoryModal.jsx
import React, { useRef, useState } from 'react';
import axios from '../../../api/axios';
import { useAuthContext } from '../../../context/AuthContext';
import { FaCamera } from "react-icons/fa"; // نصب شده از react-icons

const CreateCategoryModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth } = useAuthContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTitleError('');
    setSuccess('');

    if (!title.trim()) {
      setTitleError('عنوان الزامی است');
      setTimeout(() => setTitleError(''), 3000);
      return;
    }

    if (!image) {
      setError('لطفاً یک عکس انتخاب کنید');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      setLoading(true);
      const token = auth?.accessToken;
      const response = await axios.post('/api/categories-A', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // بازنشانی فرم و اطلاع به کامپوننت والد
      handleCancelForm();
      setSuccess('دسته‌بندی با موفقیت اضافه شد');
      setTimeout(() => setSuccess(''), 3000);

      // به والد بگو دسته‌بندی جدید اضافه شد
      if (onSuccess) {
        onSuccess(response.data);
      }

      // بستن مودال
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError('خطا در افزودن دسته‌بندی');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setTitle('');
    setImage(null);
    setImagePreview(null);
    setError('');
    setTitleError('');
    setSuccess('');
  };
const fileInputRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-md relative">
<div
  onClick={onClose}
  className="absolute top-3 left-3 h-[30px] w-[30px] flex items-center justify-center hover:bg-red-400 rounded cursor-pointer"
  title="بستن"
>
  <button className="text-gray-700 text-3xl leading-none">
    ×
  </button>
</div>



        <h2 className=" font-bold mb-3 text-right">افزودن دسته‌بندی جدید</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3" encType="multipart/form-data">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان دسته‌بندی"
            className="border-none ring-0 p-2 focus:ring-1 w-[400px] h-[32px] focus:outline-none focus:ring-blue-400 bg-gray-100 rounded-md placeholder:text-gray-400 text-gray-800"
          />
          <p className={`text-red-500 text-sm text-center h-3 ${!titleError ? 'invisible' : ''}`}>
            {titleError || ' '}
          </p>
{/* عکس */}
<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  ref={fileInputRef}
  className="hidden"
/>

<div
  onClick={() => fileInputRef.current.click()}
  className="w-[145px] h-[125px] border-2 border-dashed border-gray-300 rounded-lg overflow-hidden mx-auto relative shadow-sm bg-white cursor-pointer"
>
  {imagePreview ? (
    <img
      src={imagePreview}
      alt="پیش‌نمایش"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm gap-1">
      <FaCamera className="text-2xl" />
      <span className="text-xs">بدون عکس</span>
    </div>
  )}
</div>
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={handleCancelForm}
              className="border-gray-400 text-gray-700 w-[125px] h-[40px] font-tracfick px-4 py-2 rounded-xl mx-2 hover:ring-1 bg-gray-100 hover:outline-none hover:ring-blue-400 transition duration-200"
            >
              لغو فرم
            </button>

            <button
              type="submit"
              className="bg-blue-400 text-white py-2 px-4 rounded-xl hover:bg-blue-500 flex items-center justify-center min-w-[100px]"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
              ) : (
                'ثبت دسته‌بندی'
              )}
            </button>


          </div>

          <p className="text-green-600 text-center min-h-[24px]">{success}</p>
          <p className="text-red-600 text-center min-h-[24px]">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
