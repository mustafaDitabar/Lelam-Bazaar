import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import ProductItem from './ProductItem';
import Title from './Title';

const CategoryPage = () => {
  const { categoryId } = useParams(); // گرفتن آیدی از URL
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  window.scrollTo(0, 0);
}, [categoryId]);

  useEffect(() => {
    const fetchAdsByCategory = async () => {
      try {

const res = await axios.post('/api/adds/by-category', { categoryId }); // ✅ body استفاده می‌شود
        setAds(res.data);
        console.log(res.data,"dataaaaaaa");
        setLoading(false);
      } catch (err) {
        console.error('❌ خطا در دریافت آگهی‌های دسته:', err);
        setLoading(false);
      }
    };

    fetchAdsByCategory();
  }, [categoryId]);

  return (
    <div className="rtl my-10 font-tracfick px-4 bg-white dark:bg-blackbg text-black  dark:text-colorwhite  ">
      <Title text1="آگهی‌های دسته‌بندی" />
      {loading ? (
        <p className="text-center mt-10">در حال بارگذاری...</p>
      ) : ads.length === 0 ? (
        <p className="text-center mt-10">هیچ آگهی‌ای یافت نشد.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {ads.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.imagesURLs?.[0]}
              name={item.title}
              price={item.price}
              location={item.location}
              date={item.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
