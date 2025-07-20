import React from 'react';
// import myImage from '../../';

function Hero() {
  return (
// 
    <div className=" ltr relative w-full h-[300px]   bg-cover bg-center "
      style={{ backgroundImage: `url("/Phote(34).png")` }}

>
    {/* لایه تاریکی (اوورلی) */}
    <div className="absolute inset-0 bg-blue-300 bg-opacity-30"></div>

    {/* محتوا (متن) در سمت راست */}
    <div className="relative z-10 w-full h-full flex items-center justify-end px-6 sm:px-12">
      <div className="text-white text-right max-w-md">
        <h2 className="text-xl sm:text-xl font-bold mb-2">وسایل اضافی شما، نیاز یک فرد دیگر است!</h2>
        <p className="text-sm sm:text-beas leading-relaxed">اینجا سریع، ساده و با قیمت مناسب بخرید و بفروشید</p>
        <a
          href="/"
          className="inline-block mt-4  hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition"
        >
          دریافت اپلیکیشن اندروید
        </a>
      </div>
    </div>
  </div>
);
}


export default Hero
