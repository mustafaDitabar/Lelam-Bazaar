// import React, { useState } from 'react';
// import { Search } from 'lucide-react'; // یا هر آیکن دلخواه از heroicons
// import { Link } from 'react-router-dom';
// const SearchBar = () => {
//   const [query, setQuery] = useState('');

//   return (
//     <Link to='./Collection' >
    
//     <div className="flex items-center w-full max-w-xl mx-auto bg-zinc-700 text-white rounded-md overflow-hidden shadow-md">
//       <input
//         type="text"
//         className="w-full bg-zinc-800 text-sm sm:text-base p-3 focus:outline-none placeholder:text-right placeholder:text-gray-400"
//         placeholder="جستجو حرفه ای محصولات..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button className="bg-cyan-400 p-3 hover:bg-cyan-500 transition">
//         <Search className="text-white w-5 h-5" />
//       </button>
//     </div>
//     </Link>
//   );
// };

// export default SearchBar;






import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from "../context/ShopContext";
import assets from "../assets/assets";
import { useLocation } from 'react-router-dom';

const  SearchBar = () => {
  const {search, setSearch, showSearch ,setShowSearch}= useContext(ShopContext);
  const [visible,setVisible]= useState(false);
  const location = useLocation();


  useEffect(()=>{
    console.log('Location:', location.pathname);
    if(location.pathname.includes('collection')){
      setVisible(true);
    }    
    else{
      setVisible(false);
    }
  },[location])


  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center dark-bg-myColor">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
      <input value={search} onChange={(e)=> setSearch(e.target.value)} className="flex-1 outline-none bg-inherit text-sm" type="text" placeholder="Search"/>
      <img className="w-4" src={assets.searchIcon} alt="" />
      </div>
      <img onClick={()=> setShowSearch(false)} className="inline w-3 cursor-pointer" src={assets.close} alt="crrosIcon" />
    </div>
  ):null;
}

export default SearchBar;


