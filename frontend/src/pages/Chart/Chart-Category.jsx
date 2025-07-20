import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Chart from "./Cahrt"
import { useAuthContext } from '../../context/AuthContext';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import { FaTags } from 'react-icons/fa';

const COLORS = ['#60c0f9', '#6ee7b7', '#facc15', '#f87171', '#a78bfa', '#fb923c'];

const AdminCategoryPieCharts = () => {
  const [categories, setCategories] = useState([]);
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const token = auth?.accessToken;
        const res = await axios.get('/api/admin/category-stats', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (err) {
        console.error('خطا در دریافت دسته‌بندی‌ها:', err);
      }
    };

    fetchCategoryStats();
  }, [auth]);

  return (
    <div>
        <Chart/>
    <div className="grid grid-cols-1 pr-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {categories.map((cat, index) => {
        const chartData = [
          { name: cat.category, value: cat.percentage },
          { name: 'باقی', value: 100 - cat.percentage }
        ];

        return (
          <div
            key={cat.category}
            className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-3 border border-slate-300 dark:border-slate-700"
          >
            <div className="flex flex-col pt-3 items-center">
              <FaTags className="text-blue-500 text-3xl pb-1" />
              <h3 className="text-bold font-semibold  text-gray-700 dark:text-gray-300 mt-1">
                {cat.category}
              </h3>
              <div className="w-[160px] h-[160px]  ">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={22}
                      outerRadius={58}
                      paddingAngle={1}
                      labelLine={false}
                    >
                      {chartData.map((_, i) => (
                        <Cell
                          key={`cell-${i}`}
                          fill={i === 0 ? COLORS[index % COLORS.length] : '#e5e7eb'}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'درصد آگهی‌ها']}
                      contentStyle={{
                        backgroundColor: '#f9fafb',
                        borderRadius: 8,
                        borderColor: '#d1d5db',
                      }}
                      itemStyle={{ color: '#374151' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

<div className='gap-6  '>
                  <span className="text-bold  text-gray-600 dark:text-gray-400 mt-1 ">
                تعداد آگهی: <strong className="text-balck-500 dark:text-indigo-400">{cat.count}</strong>
              </span>
              <span className="text-bold text-gray-600 dark:text-gray-400  pr-6 mt-1">
                درصد: <strong className="text-blue-500 dark:text-green-400">{cat.percentage}%</strong>
              </span>
</div>
            </div>
          </div>
        );
      })}
    </div>
    </div>

  );
};

export default AdminCategoryPieCharts;
