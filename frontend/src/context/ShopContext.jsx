import { createContext, useState, useEffect, useCallback } from "react";
import { products } from "../assets/assets.js";
import axios from "../api/axios"; // ← استفاده از axios با پورت 3500

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const fetchCategories = useCallback(() => {
    setLoadingCategories(true);
    axios.get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("❌ خطا در دریافت دسته‌بندی‌ها:", err))
      .finally(() => setLoadingCategories(false));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    categories,
    setCategories,
    fetchCategories,
    loadingCategories
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;


// import { createContext, useState, useEffect, useCallback } from "react";
// import { products } from "../assets/assets.js";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const currency = "$";
//   const delivery_fee = 10;

//   // استیت‌های جستجو و دسته‌بندی‌ها
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(true);
//   const [categories, setCategories] = useState([]);

//   // تابع جداگانه برای دریافت دسته‌بندی‌ها (برای استفاده مجدد)
//   const fetchCategories = useCallback(() => {
//     fetch("http://localhost:3000/api/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error("❌ خطا در دریافت دسته‌بندی‌ها:", err));
//   }, []);

//   // فراخوانی اولیه دسته‌بندی‌ها
//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     categories,
//     setCategories,
//     fetchCategories // ← حالا از این میشه در فرم‌ها برای بروزرسانی استفاده کرد
//   };

//   return (
//     <ShopContext.Provider value={value}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
