// src/pages/admin/UpdateCategoryModal.jsx
import React, { useState } from 'react';
import axios from '../../../api/axios';
import { useAuthContext } from '../../../context/AuthContext';

const UpdateCategoryModal = ({ category, onClose, onSuccess }) => {
  const [title, setTitle] = useState(category.title || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    `http://localhost:3500/images/${category.imagesURLs?.[0]?.split('/').pop()}`
  );
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
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      if (image) formData.append('image', image);

      const token = auth?.accessToken;
      const response = await axios.put(`/api/categories-PUT-A/${category._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      onSuccess(response.data);
      onClose();
    } catch (err) {
      console.error('خطا در بروزرسانی دسته:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
  <div className="bg-white p-4 rounded-lg relative shadow-lg w-full max-w-md">
    
    {/* آیکن بستن در گوشه بالا-چپ */}
<div className="absolute top-3 left-3 w-[30px] h-[30px] flex items-center justify-center rounded-md text-gray-700 text-3xl hover:bg-red-500 cursor-pointer">
  <button
    onClick={onClose}
    className="w-full h-full flex items-center justify-center"
    title="بستن"
  >
    ×
  </button>
</div>


    <h2 className="text-lg font-bold text-right mb-4">ویرایش دسته‌بندی</h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان دسته‌بندی"
        className="p-2 ring-0 focus:ring-1 w-full h-[30px] focus:outline-none focus:ring-blue-300 bg-gray-100 rounded-md placeholder:text-gray-400 text-gray-500"
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      <div className="w-32 h-28 mx-auto border rounded overflow-hidden">
        <img src={imagePreview} alt="پیش‌نمایش" className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-end gap-4 mt-3">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-800 text-center rounded-lg w-[75px] h-[30px] border hover:border-blue-400"
        >
          لغو
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded w-[75px] h-[30px] hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'در حال بروزرسانی...' : 'ذخیره'}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default UpdateCategoryModal;
