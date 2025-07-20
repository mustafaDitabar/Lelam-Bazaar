// src/pages/AllAdsPage.jsx

import React, { useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';

const AllAdsPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/ads')
      .then((res) => res.json())
      .then((data) => setAds(data))
      .catch((err) => console.error('❌ خطا در گرفتن آگهی‌ها:', err));
  }, []);

  return (
    <div className="rtl px-4 py-6 bg-white text-black dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">تمام آگهی‌ها</h1>

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
    </div>
  );
};

export default AllAdsPage;
