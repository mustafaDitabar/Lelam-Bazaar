// components/CategoryGrid.js
import { NavLink } from 'react-router-dom';
import Categories from '../pages/Categories';  // ایمپورت کردم حال چطور کنم
const CategoryGrid = ({ categories }) => {
  return (
    <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 text-sm text-gray-700'>
      {categories.map((cat) => (
        <NavLink
          key={cat._id}
          to={cat.link}
          className='flex flex-col items-center w-full h-[205px] rounded-xl shadow hover:shadow-lg transition duration-300 bg-white'
        >
          <img src={cat.image} alt={cat.name} />
          <p className='text-center text-lg font-semibold text-gray-700'>{cat.name}</p>
        </NavLink>
      ))}
    </ul>
  );
};

export default CategoryGrid;
