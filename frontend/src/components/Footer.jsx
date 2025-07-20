import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer=()=> {
  return (
      <div className='ltr py-5 text-sm text-center  font-tracfick'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      

      <div className='flex items-center'>
       <a 
         href="https://www.google.com" target="_blank"  rel="noopener noreferrer"
         className='flex items-center gap-1 bg-black text-white text-sm px-3 py-1.5 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 w-fit'>
         <img src={assets.googlePlay} alt='Google Play' className='w-5 h-5' />
         <span className='font-medium'>Google Play</span>
       </a>
     </div>

     <div className="flex flex-col gap-3 items-center justify-center  ">
        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">
         <p className="text-lg font-medium ">درباره ما</p>
       </Link>
       <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">
         <p className="text-lg font-medium ">تماس با ما</p>
       </Link>
     </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-400'> تمام حقوق مادی و معنوی متلق به سایت بازار لیلام می باشد</p>
      </div>
    </div>
  )
}

export default Footer
