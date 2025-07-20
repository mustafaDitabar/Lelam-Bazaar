import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { useAuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CreateCategoryModal from './Allgategory';
import UpdateCategoryModal from './UpdateCategoryModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { IoAdd } from "react-icons/io5";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { auth } = useAuthContext();

  // گرفتن دسته‌بندی‌ها
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const token = auth?.accessToken;
        const response = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCategories(response.data);
      } catch (err) {
        console.error('خطا در گرفتن دسته‌بندی‌ها:', err);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.accessToken) fetchCategories();
  }, [auth?.accessToken]);

  // حذف دسته‌بندی
  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      const token = auth?.accessToken;
      await axios.delete(`/api/categories-Delete-A/${selectedCategory._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setCategories((prev) => prev.filter((c) => c._id !== selectedCategory._id));
      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (err) {
      console.error('خطا در حذف دسته‌بندی:', err);
    }
  };

if (loading) {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="p-4 space-y-4">
      {/* دکمه ایجاد */}
<div className="flex gap-2">
  <button
    onClick={() => setShowCreateModal(true)}
    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
  >
    <IoAdd className="text-2xl text-bold" /> {/* آیکن بزرگ‌تر و کنار متن */}
    ایجاد دسته‌بندی
  </button>
</div>

      {/* مودال ایجاد */}
      {showCreateModal && (
        <CreateCategoryModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={(newCategory) => setCategories((prev) => [newCategory, ...prev])}
        />
      )}

      {/* مودال بروزرسانی */}
      {showUpdateModal && selectedCategory && (
        <UpdateCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedCategory(null);
          }}
          onSuccess={(updatedCategory) =>
            setCategories((prev) =>
              prev.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
            )
          }
        />
      )}

      {/* مودال تأیید حذف */}
      {showDeleteModal && selectedCategory && (
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
        />
      )}

      {/* لیست */}
      {loading && <p className="text-gray-600">در حال بارگذاری...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 h-[320px] gap-3">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="relative w-full flex flex-col items-center rounded-xl shadow hover:shadow-lg transition duration-300 bg-white"
          >
            {/* آیکن حذف */}
            <button
              onClick={() => {
                setSelectedCategory(cat);
                setShowDeleteModal(true);
              }}
              // className="absolute top-2 bg-blue-100 text-blue-600 rounded-full p-1 right-2 text-blue-600 hover:bg-blue-200 transition hover:text-blue-800 "

              className="absolute top-2 left-2 bg-red-100 text-red-600 rounded-full p-1 transition hover:text-red-700 hover:bg-red-200"
              title="حذف"
            >
              <FaTrash />
            </button>

            {/* آیکن ویرایش */}
            <button
              onClick={() => {
                setSelectedCategory(cat);
                setShowUpdateModal(true);
              }}
                        // className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition"

              className="absolute top-2 bg-blue-100 text-blue-600 rounded-full p-1 right-2 text-blue-600 hover:bg-blue-200 transition hover:text-blue-800 "
              title="ویرایش"
            >
       <FaEdit />
            </button>

            {/* نمایش دسته */}
            <NavLink to={`${cat._id}`} className="w-full flex flex-col items-center">
              <img
                src={`http://localhost:3500/images/${cat.imagesURLs?.[0]?.split('/').pop()}`}
                alt={cat.title || 'دسته‌بندی'}
                className="w-full h-[95px] object-cover rounded-t-xl"
              />
              <p className="text-center font-semibold text-gray-700 p-2">
                {cat.title || cat.name}
              </p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCategory;
