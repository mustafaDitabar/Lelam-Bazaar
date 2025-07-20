import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../api/axios';
function Categories() {
  const [categories, setCategories] = useState([]);

 useEffect(() => {
  axios.get('/api/categories') // آدرس API شما
    .then((res) => {
      setCategories(res.data);
    })
    .catch((err) => {
      console.error('خطا در دریافت دسته‌بندی‌ها:', err);
    });
}, []);
  return (
    <div className="rtl my-10 p-4 bg-white text-black dark:bg-gray-800 dark:text-white">
      <p className="text-2xl mb-3">دسته‌بندی</p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 text-sm text-gray-700">
        {categories.map((cat) => (
          <NavLink
            key={cat._id}
            to={cat.link}
            className="flex flex-col items-center w-full h-[205px] rounded-xl shadow hover:shadow-lg transition duration-300 bg-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-40 h-33 object-contain mt-0"
            />
            <p className="text-center text-lg font-semibold text-gray-700">
              {cat.name}
            </p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
