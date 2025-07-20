import React, { useEffect, useState, useContext } from 'react';
import axios from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

const Dashboard = () => {
  const { auth } = useContext(AuthContext); // گرفتن توکن از context
  const [stats, setStats] = useState({ totalUsers: 0, totalAds: 0 });

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard-stats', {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      setStats(response.data);
    } catch (error) {
      console.error('❌ خطا در دریافت آمار داشبورد:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2  my-4 h-[90px] ">
      <div className="bg-white pt-4 mr-[54px]  rounded-xl shadow h-[90px] w-[400px]  text-center">
        <h2 className="text-lg font-bold text-gray-700">کل کاربران</h2>
        <p className="text-2xl pb-7 text-blue-600 mt-2">{stats.totalUsers}</p>
      </div>
      <div className="bg-white pt-4 rounded-xl mr-4 shadow h-[90px] w-[400px] text-center">
        <h2 className="text-lg font-bold text-gray-700">کل آگهی‌ها</h2>
        <p className="text-2xl pb-7 text-green-600 mt-2">{stats.totalAds}</p>
      </div>
    </div>
  );
};

export default Dashboard;
