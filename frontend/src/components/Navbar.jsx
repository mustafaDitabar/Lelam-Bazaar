
  
// جدید
import React, { useState, useContext } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import ProfileIcon from './profileIcon';
import DarkMode from '../pages/Home/DarkMode'
const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { setShowSearch } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    setShowSearch(true);
    if (location.pathname !== '/collection') {
      navigate('/collection');
    }
  };

  return (
    <div className="  rtl bg-white w-full h-[50px] bg-white text-black dark:bg-myColor dark:text-colorwhite   font-tracfick flex items-center justify-between px-4 py-3  fixed top-0 left-0 right-0 bg-white shadow z-[9999]">

      {/* لوگو + جستجو (در سمت چپ در همه حالت‌ها) */}
      <div className="flex items-center gap-3">
        <Link to='/' className="flex items-center gap-2">
        <img src={assets.Logo} className='w-[36px]  h-[36px]' alt='Logo' />
          <span className='text-base font-bold  bg-white text-black dark:bg-gray-800 dark:text-blue-500 pt-1'>بازار لیلام</span>
        </Link>
        <img
          onClick={handleSearchClick}
          src={assets.searchIcon}
          alt="Search"
          className='w-5 bg-white text-black dark:bg-gray-800 dark:text-blue cursor-pointer'
        />
      </div>

      {/* سمت راست: آیکن‌ها برای دسکتاپ */}
      <div className=" hidden sm:flex items-center gap-6">

        {/* دکمه ثبت آگهی */}
        <Link to='/placeOrder'>
          <div className='flex items-center gap-2  text-white px-3 py-1 rounded' style={{ backgroundColor: '#1384EE' }  }>
          <img src={assets.addIcon} className='w-4  h-4' alt='Add' />
            <p className='text-sm'>ثبت آگهی</p>
          </div>
        </Link>

        {/* دارک مود و زبان */}
        <DarkMode/>
        {/* <span className="italic text-sm pt-1">دری</span> */}

        {/* پروفایل */}

        <ProfileIcon/>
        {/* <div className="group relative cursor-pointer">
          <Link to='/register'>
          <img src={assets.profile} className='w-[26px] h-[25px]' alt='Profile' />
          </Link>
        </div> */}
      </div>

      {/* آیکن منو برای موبایل */}
      <div className="sm:hidden flex items-center">
        <img
          onClick={() => setMenuVisible(true)}
          src={assets.menuIcon}
          alt="Menu"
          className='w-5 cursor-pointer'
        />
      </div>

      {/* منوی موبایل */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all bg-white text-black dark:bg-gray-800 dark:text-white duration-300 shadow-md ${menuVisible ? 'w-4/5 px-6 py-4' : 'w-0 overflow-hidden'} sm:hidden`}>
        <div className='flex flex-col text-gray-700 h-full'>
          <div onClick={() => setMenuVisible(false)} className='flex items-center gap-2 py-2 cursor-pointer'>
            <img className='h-4 rotate-180 ' src={assets.backIcon} alt="Back" />
            <p>بازگشت</p>
          </div>
          <NavLink onClick={() => setMenuVisible(false)} className='py-2 border-b' to='/'>خانه</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className='py-2 border-b' to='/favorites'>علاقه‌مندی‌ها</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className='py-2 border-b' to='/darkmode'>دارک مود</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className='py-2 border-b' to='/placeOrder'>ثبت آگهی</NavLink>
          <NavLink onClick={() => setMenuVisible(false)} className='py-2 border-b' to='/user'>راجستر</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
