import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment-jalaali';
import assets from '../../../assets/Location.png';

moment.locale('fa');

const getFormattedDate = (inputDate) => {
  return moment.utc(inputDate).utcOffset('+04:30').format('jYYYY/jMM/jDD HH:mm');
};

const AdCard = ({ id, image, name, price, date, location, onDelete }) => {
  const [timeAgo, setTimeAgo] = useState('');

  const getExactTime = (inputDate) => {
    const now = moment().utcOffset('+04:30');
    const past = moment(inputDate).utcOffset('+04:30');

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
    const updateTime = () => setTimeAgo(getExactTime(date));
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="relative w-full h-[200px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden rtl">

      {/* آیکن حذف – بالا سمت چپ */}
      <div className="absolute top-2 left-2 z-10">
        <button
          onClick={() => onDelete(id)} // فقط باز کردن مودال تایید
          className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
        >
          <FaTrash />
        </button>
      </div>

      {/* عکس آگهی */}
      <div className="w-full h-[130px] overflow-hidden">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </Link>
      </div>

      {/* محتوای کارت */}
      <div className="p-4 flex flex-col justify-between flex-grow text-right">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-gray-800">
            {name.length > 18 ? name.slice(0, 18) + '...' : name}
          </h3>
          <span className="text-black font-bold text-sm">{price} افغانی</span>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <img className="w-[10px] h-[10px]" src={assets} alt="loc" />
            {location}
          </span>
          <span>{timeAgo} قبل</span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
