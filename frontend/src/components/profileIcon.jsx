import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import defaultProfile from '../assets/profile.png'; // مسیر عکس پیشفرض رو تنظیم کن

const ProfileIcon = () => {
  const { auth } = useContext(AuthContext);
  const isLoggedIn = !!auth?.userInfo;
 const serverBaseURL = 'http://localhost:3500';
const profilePhoto = isLoggedIn && auth.userInfo.photo
  ? `${serverBaseURL}/images/${auth.userInfo.photo.split('/').pop()}`
  : defaultProfile;


  return (
    <div className="group relative cursor-pointer">
      <Link to={isLoggedIn ? '/profile' : '/register'}>
        <img
          src={profilePhoto}
          className="w-[32px] h-[32px] rounded-full object-cover border border-gray-300"
          alt="Profile"
        />
      </Link>
    </div>
  );
};

export default ProfileIcon;
