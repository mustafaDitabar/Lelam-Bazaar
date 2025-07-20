import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { FaRegHeart } from "react-icons/fa";

import { IoMdChatboxes } from "react-icons/io";
import DOMPurify from 'dompurify';
import { assets } from '.././assets/assets';
import { AuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import ProductItem from './Product-Iteme';
const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const { auth } = useContext(AuthContext);
  const { setSelectedConversation } = useConversation();
const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/add-d/${productId}`, {
        });
        setProduct(res.data);
        console.log(res.data,"اصلاعات دیتا");
        if (Array.isArray(res.data.imagesURLs) && res.data.imagesURLs.length > 0) {
          setSelectedImage(res.data.imagesURLs[0]);
        }

      // درخواست آگهی‌های مشابه پس از دریافت آگهی اصلی
      const categoryId = res.data.categoryId;
            console.log(categoryId,"آیدی دسته بندی");

      const relatedRes = await axios.get(`/api/adds/related/${categoryId}`);
      const filtered = relatedRes.data.filter(item => item._id !== res.data._id).slice(0, 10);
      setRelatedProducts(filtered);
 
       
        window.scrollTo(0, 0);
    
console.log(filtered,"اطلاعات آمده از سرور");

      } catch (err) {
        console.error('خطا در دریافت اطلاعات محصول:', err);
      }
    };

    fetchProduct();
  }, [productId, auth]);

  const handleDirectChat = async () => {
    if (!auth?.userInfo) {
      alert('برای شروع چت لطفاً وارد شوید.');
      return;
    }



    const currentUserId = auth.userInfo._id;
    const sellerId = product.creatorId;



    if (currentUserId === sellerId) {
      alert('نمی‌توانید با خودتان چت کنید.');
      return;
    }

    try {
      const token = auth.accessToken;

      // بررسی مکالمه موجود
      const res = await axios.get(`/api/conversations/find/${currentUserId}/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let conversation = res.data;

     

      // تنظیم در Zustand
      setSelectedConversation(conversation);

      // هدایت به چت
      navigate(`/profile?conversationId=${conversation._id}&activeTab=chat`);

    } catch (err) {
      console.error('خطا در شروع چت:', err);
      alert('خطا در شروع چت، لطفا دوباره تلاش کنید.');
    }
  };

if (!product) {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      <p className="text-blue-600 font-semibold">در حال بارگذاری...</p>
    </div>
  );
}



const price = product.price;

  return (
    <div className="p-6 ltr bg-white text-black dark:bg-blackbg dark:text-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* گالری تصاویر */}
        <div className="flex-1 flex gap-4">
          <div className="flex flex-col gap-2 w-1/5">
            {Array.isArray(product.imagesURLs) && product.imagesURLs.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className="w-full cursor-pointer border rounded-lg"
                alt="thumb"
              />
            ))}
          </div>
          <div className="w-4/5">
            {selectedImage && (
              <img src={selectedImage} alt="product" className="w-full rounded-lg" />
            )}
          </div>
        </div>

        {/* اطلاعات محصول */}
        <div className="flex-1 pr-6 rtl">
           <div className="text-right text-bold dark:text-colorwhite1 text-gray-700 mb-4 leading-relaxed">
  <span className="font-bold "> عنوان آگهی : </span>
  <span className='font-bold'>{product.title}</span>
</div>

           <div className="text-right dark:text-colorwhite1 text-gray-700 mb-4 leading-relaxed">
           <span className="font-bold">جزئیات  : </span>
           <span className='font-bold' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
        </div>


          <p className=" border-1 rounded font-bold text-gray-600 mb-4">
            <span className="px-2 text-gray-700 dark:text-colorwhite1 ">قیمت : </span>
<span className="text-colorprimary dark:text-colorprimary text-left font-bold">
  {price
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٫')  // جداکننده هزارگان
    .replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]) // تبدیل به عدد فارسی
  } افغانی
</span>
          </p>
          <p className=" border-1 rounded font-bold text-gray-600  mb-4">
            <span className="px-2 text-gray-700 text-md dark:text-colorwhite1">شماره تماس :</span>
            <span className='text-gray-700 dark:text-colorwhite1'>{product.phoneNumber} </span>

          </p>
          <div className="justify-center   gap-8 pt-1 flex">
          <FaRegHeart className="size-[35px] " />


            <button
              onClick={handleDirectChat}
              className="flex flex-row-reverse items-center bg-blue-400 text-white mx-5 px-5 py-2.5 rounded hover:bg-blue-500"
            >
              چت مستقیم <IoMdChatboxes className="size-[20px] color-white mx-1 mt-1"  />
            </button>
          </div>
        </div>
      </div>

{/* آگهی‌های مرتبط */}
{relatedProducts.length > 0 && (
  <div className="mt-10 pr-2 rtl bg-white text-black dark:bg-blackbg dark:text-white">
    <h2 className="text-xl font-bold mb-4 text-right text-gray-700 dark:text-colorwhite">آگهی‌های مرتبط</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {relatedProducts.map((item) => (
        <ProductItem
          key={item._id}
          id={item._id}
          image={Array.isArray(item.imagesURLs) ? item.imagesURLs[0] : ''}
          name={item.title}
          price={item.price}
          date={item.createdAt}
          location={item.location}
        />
      ))}
    </div>
  </div>
)}



    </div>
  );
};

export default Product;

