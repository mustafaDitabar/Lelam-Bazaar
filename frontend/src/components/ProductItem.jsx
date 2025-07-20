

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import assets from '../assets/assets';
import moment from 'moment-jalaali';

moment.locale('fa');
const getFormattedDate = (inputDate) => {
  return moment.utc(inputDate).utcOffset('+04:30').format('jYYYY/jMM/jDD HH:mm'); // تاریخ شمسی
};

const ProductItem = ({ id, image, name, price, date, location }) => {
  const [timeAgo, setTimeAgo] = useState('');

  const getExactTime = (inputDate) => {
  const now = moment().utcOffset('+04:30'); // کابل
  const past = moment(inputDate).utcOffset('+04:30'); // کابل، بدون تبدیل به UTC

  const seconds = now.diff(past, 'seconds');
  if (seconds < 60) return `${seconds} ثانیه`;

  const minutes = now.diff(past, 'minutes');
  if (minutes < 60) return `${minutes} دقیقه`;

  const hours = now.diff(past, 'hours');
  if (hours < 24) return `${hours} ساعت`;

  const days = now.diff(past, 'days');
  if (days < 7) return `${days} روز`;

  const weeks = now.diff(past, 'weeks');
  if (weeks < 4) return `${weeks} هفته`;

  const months = now.diff(past, 'months');
  if (months < 12) return `${months} ماه`;

  const years = now.diff(past, 'years');
  return `${years} سال`;
};


  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(getExactTime(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);

    return () => clearInterval(interval);
  }, [date]);
// bg-white text-black dark:bg-gray-800 dark:text-white  
  return (
    <div className="rtl w-full h-[260px] bg-white text-black dark:bg-myColor dark:text-white bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="w-full h-full overflow-hidden">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </Link>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow dark:bg-myColor dark:text-white text-right">
        <div className="flex justify-between items-right ">
          <h3 className="text-lg font-primary  dark:text-colorwhite text-gray-800">
            {name.length > 12 ? name.slice(0, 12) + '...' : name}
          </h3>
<span className="text-colorprimary dark:text-colorprimary text-left font-bold">
  {price
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٫')  // جداکننده هزارگان
    .replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) // تبدیل به عدد فارسی
  } افغانی
</span>


        </div>

        <div className="flex rtl items-center justify-between mt-4 text-myColor dark:bg-myColor dark:text-colorwhite1">
          <span className="flex dark:text-colorwhite1 text-sm">
            <img className="w-[10px] h-[10px] " src={assets.location} alt="" />
            {location}
          </span>

          <div className="flex  text-sm">
            {timeAgo} قبل
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
