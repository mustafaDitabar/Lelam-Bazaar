// ProductItem.jsx
import React, { useState } from 'react';
import moment from 'moment-jalaali';
import assets from '../../../assets/assets';
import ConfirmModal from './ConfirmModal';

moment.locale('fa');
moment.loadPersian({ dialect: 'persian-modern' });

const getExactTime = (inputDate) => {
  const now = moment();
  const past = moment.utc(inputDate).local();
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

const ProductItem = ({ ad }) => {
  const [showModal, setShowModal] = useState(false);
  const timeAgo = getExactTime(ad.createdAt);

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer rtl w-full h-[200px] bg-white rounded-2xl  shadow-lg hover:shadow-xl transition-shadow flex flex-col"
      >
      <div className="w-full h-full overflow-hidden rounded-t-2xl">
          <img src={ad.imagesURLs?.[0]} alt={ad.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex flex-col justify-between text-right">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              {ad.title.length > 12 ? ad.title.slice(0, 12) + '...' : ad.title}
            </h3>
            <span className="text-black font-bold text-base">{ad.price} افغانی</span>
          </div>
          <div className="flex justify-between mt-4 rounded  text-gray-500 text-sm">
            <span className="flex">
              <img className="w-[10px] h-[10px] mr-1" src={assets.location} alt="" />
              {ad.location}
            </span>
            <span>{timeAgo} قبل</span>
          </div>
        </div>
      </div>

      {showModal && <ConfirmModal ad={ad} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ProductItem;
