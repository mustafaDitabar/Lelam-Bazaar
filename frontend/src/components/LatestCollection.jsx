import React, { useEffect, useState, useContext, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from "../context/AuthContext";
import Title from './Title';
import ProductItem from './ProductItem';
import { NavLink } from 'react-router-dom';
import axios from '../api/axios';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const { auth } = useContext(AuthContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef();

  // اسکرول چپ و راست
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // گرفتن دسته‌بندی‌ها
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/categories');
        const data = res.data;
        const uniqueCategories = Array.from(
          new Map(data.map(item => [item.title, item]))
        ).map(([_, value]) => value);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('❌ خطا در دریافت دسته‌بندی‌ها:', err);
      }
    }
    fetchCategories();
  }, [auth]);

  // گرفتن آگهی‌های جدید
  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        const res = await axios.get('/api/adds');
        setLatestProducts(res.data);
      } catch (err) {
        console.error('❌ خطا در دریافت آگهی‌ها:', err);
      }
    }
    fetchLatestProducts();
  }, [auth]);

  return (
    <div className='rtl my-10 font-tracfick'>
      <p className='text-2xl mb-3 px-4 dark:text-colorwhite'>دسته‌بندی‌ها</p>

      {/* بخش دسته‌بندی‌ها با اسکرول دکمه‌ای */}
      <div className="relative w-full">
        {/* دکمه اسکرول راست */}
        <button
          onClick={scrollRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 dark:bg-white bg-white rounded-full shadow p-2 hover:bg-gray-200 bg-gray-200"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>

        {/* دکمه اسکرول چپ */}
        <button
          onClick={ scrollLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200 bg-gray-200"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-800 text-lg" />
        </button>

        {/* لیست دسته‌بندی‌ها */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-8 py-2 scroll-smooth no-scrollbar"
        >
          {categories.map((cat) => (
            <NavLink
              key={cat._id}
              to={`/category/${cat._id}`}
              className="min-w-[140px] flex-shrink-0 flex flex-col items-center rounded-xl shadow dark:text-colorwhite1 dark:bg-myColor hover:shadow-lg transition duration-300 bg-white"
            >
              <img
                src={`http://localhost:3500/images/${cat.imagesURLs?.[0]?.split('/').pop()}`}
                alt={cat.title || 'دسته‌بندی‌ها'}
                className="w-40 h-32 object-cover dark:text-colorwhite1 rounded-t-xl"
              />
              <p className="text-center text-lg  dark:text-colorwhite text-gray-700 p-2">
                {cat.title || cat.name}
              </p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* عنوان آگهی‌های جدید */}
      <div className='text-center py-8 dark:text-colorwhite text-3xl'>
        <Title text1={' آگهی‌های جدید '}  />
      </div>

      {/* لیست آگهی‌ها */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 dark:bg-blackbg lg:grid-cols-5 gap-4 gap-y-6 px-4'>
        {latestProducts.slice(0, 25).map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.imagesURLs?.[0]}
            name={item.title}
            price={item.price}
            location={item.location}
            date={item.createdAt}
          />
        ))}
      </div>

      {/* دکمه نمایش بیشتر */}
      <div className="text-center mt-6">
        <NavLink
          to="/ads"
          className="inline-block font-bold text-black px-6 py-2 dark:text-colorwhite rounded-xl hover:bg-blue-500 transition"
        >
          نمایش بیشتر ...
        </NavLink>
      </div>
    </div>
  );
}

export default LatestCollection;
