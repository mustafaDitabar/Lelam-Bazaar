import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import ProductItem from '../components/ProductItem';
import { AuthContext } from '../context/AuthContext';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('relavent');

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAdds = async () => {
      try {
        const token = auth?.accessToken;
        const res = await axios.get('/api/adds', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
        setFilterProducts(res.data);

        const uniqueLocations = [...new Set(res.data.map((item) => item.location))];
        setLocations(uniqueLocations);
      } catch (err) {
        console.error('❌ خطا در دریافت آگهی‌ها:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('❌ خطا در دریافت دسته‌بندی‌ها:', err);
      }
    };

    fetchAdds();
    fetchCategories();
  }, [auth]);

  useEffect(() => {
    applyFilter();
  }, [search, selectedLocation, selectedCategory, products]);

  useEffect(() => {
    applySort();
  }, [sortType]);

  const applyFilter = () => {
    let filtered = [...products];

    // فیلتر جستجو
    if (search.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // فیلتر موقعیت
    if (selectedLocation) {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }

    // فیلتر دسته‌بندی
    if (selectedCategory) {
      filtered = filtered.filter((item) => {
        if (item.category && typeof item.category === 'object' && item.category._id) {
          return item.category._id === selectedCategory;
        }
        return item.category === selectedCategory;
      });
    }

    setFilterProducts(filtered);
  };

  const applySort = () => {
    let sorted = [...filterProducts];

    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sorted);
  };

  return (
    <div className="rtl flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="flex-1">
        <div className="rtl flex justify-start items-center flex-wrap gap-2 sm:gap-4 text-sm sm:text-base mb-4">
          
          <div className="mb-1 border-2 rounded border-gray-300 text-sm px-2">
            <label>جستجو:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 outline-none"
            />
          </div>

          <div className="mb-1 border-2 rounded border-gray-300 text-sm px-2">
            <label>دسته‌بندی:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">همه دسته‌بندی‌ها</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-1 border-2 rounded border-gray-300 text-sm px-2">
            <label>موقعیت:</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">همه</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="border-2 mb-2 rounded border-gray-300 text-sm px-2">
            <label>ترتیب قیمت:</label>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relavent">عمومی</option>
              <option value="low-high">صعودی</option>
              <option value="high-low">نزولی</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6">
          {filterProducts.length === 0 ? (
            <p>محصولی یافت نشد.</p>
          ) : (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.title}
                price={item.price}
                address={item.location}
                date={item.createdAt}
                image={item.imagesURLs?.[0]}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;


// import React, { useContext, useEffect, useState } from 'react';
// import axios from '../api/axios';
// import ProductItem from '../components/ProductItem';
// import { AuthContext } from '../context/AuthContext';

// const Collection = () => {
//   const [products, setProducts] = useState([]);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [address, setAddress] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relavent');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState('');
//   const [locations, setLocations] = useState([]);
//   const { auth } = useContext(AuthContext);
//   const handleSelectAddress = (e) => {
//     const selected = e.target.value;
//     setAddress(selected ? [selected] : []);
//   };

//   const applyFilter = () => {
//     let productsCopy = [...products];

//     if (search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (address.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         address.includes(item.location)
//       );
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }



// if (selectedCategory) {
//   productsCopy = productsCopy.filter(
//     (item) => item.category?._id === selectedCategory || item.category === selectedCategory
//   );
// }
    

//     setFilterProducts(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = [...filterProducts];
//     if (sortType === 'low-high') {
//       fpCopy.sort((a, b) => a.price - b.price);
//     } else if (sortType === 'high-low') {
//       fpCopy.sort((a, b) => b.price - a.price);
//     }
//     setFilterProducts(fpCopy);
//   };

//   useEffect(() => {
//     const fetchAdds = async () => {
//       try {
//         const token = auth?.accessToken;
//         const res = await axios.get('/api/adds', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(res.data);
//         setFilterProducts(res.data);
//         const uniqueLocations = [...new Set(res.data.map((add) => add.location))];
//         setLocations(uniqueLocations);
//       } catch (err) {
//         console.log('❌ خطا در دریافت آگهی‌ها:', err);
//       }
//     };
//     fetchAdds();
//   }, [auth]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('/api/categories');
//                 console.log(res.data,"کته گوری");

//         setCategories(res.data);
//       } catch (err) {
//         console.log('❌ خطا در دریافت دسته‌بندی‌ها:', err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     applyFilter();
//   }, [search, address, subCategory, selectedCategory, products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);
// console.log( selectedCategory,"کته گوری انتخاب شده");
// console.log(filterProducts, "محصولات فیلتر شده");
//   return (
//     <div className="rtl flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       <div className="flex-1">
//         <div className="rtl flex justify-start items-center flex-wrap gap-2 sm:gap-4 text-sm sm:text-base mb-4">
//           <div className="mb-1 border-2 rounded border-gray-300 text-sm px-2">
//             <label>فلتر نتایج جستجو:</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">همه دسته‌بندی‌ها</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-1 border-2 rounded border-gray-300 text-sm px-2">
//             <label>موقعیت:</label>
//             <select onChange={handleSelectAddress}>
//               <option value="">همه</option>
//               {locations.map((loc, index) => (
//                 <option key={index} value={loc}>
//                   {loc}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="border-2 mb-2 rounded border-gray-300 text-sm px-2">
//             <label>ترتیب به اساس قیمت:</label>
//             <select
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//             >
//               <option value="relavent">عمومی</option>
//               <option value="low-high">صعودی</option>
//               <option value="high-low">نزولی</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6">
//           {filterProducts.map((item) => (
//             <ProductItem
//               key={item._id}
//               id={item._id}
//               name={item.title}
//               price={item.price}
//               address={item.location}
//               date={item.createdAt}
//               image={item.imagesURLs?.[0]}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;


//کد سابق
//  import React, { useContext, useEffect, useState } from 'react';
// import axios from '.././api/axios';
// import ProductItem from '../components/ProductItem';
// import { AuthContext } from "../context/AuthContext";


// const Collection = () => {
//   const [products, setProducts] = useState([]);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [address, setAddress] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState('relavent');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const [locations, setLocations] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const { auth, setAuth } = useContext(AuthContext);


//   const handleSelectAddress = (e) => {
//     setAddress([e.target.value]);
//     const selected = e.target.value;
//   if (selected === '') {
//     setAddress([]);
//   } else {
//     setAddress([selected]);
//   }
//   };

//   const applyFilter = () => {
//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (address.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         address.includes(item.location)
//       );
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     setFilterProducts(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case 'low-high':
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;
//       case 'high-low':
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   // گرفتن آگهی‌ها از بک‌اند
//   useEffect(() => {
//     const fetchAdds = async () => {
//       try {
//          const token = auth?.accessToken;

//             const res = await axios.get('/api/adds', {
//             headers: {
//                      Authorization: `Bearer ${token}`
//                      }
//              });
//                          setProducts(res.data);
//                          setFilterProducts(res.data);
//               // استخراج موقعیت‌ها (location)
//       const uniqueLocations = [...new Set(res.data.map(add => add.location))];
//       setLocations(uniqueLocations);
//       } catch (err) {
//         console.log('❌ خطا در دریافت آگهی‌ها:', err);
//       }
//     };

//     fetchAdds();
//   }, []);



//   // گرفتن دسته‌بندی‌ها از بک‌اند (اختیاری اگر نیاز بود)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {

//         const res = await axios.get('/api/categories');
//         setCategories(res.data);
//       } catch (err) {
//         console.log('❌ خطا در دریافت دسته‌بندی‌ها:', err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (!search && address.length === 0 && subCategory.length === 0) {
//       setFilterProducts(products);
//     } else {
//       applyFilter();
//     }
//   }, [address, subCategory, search, showSearch, products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <div className=" rtl flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* قسمت راست */}
//       <div className="flex-1">
//         <div className="rtl flex justify-start items-center flex-wrap gap-2 sm:gap-4 text-sm sm:text-base mb-4">
//           <div className="mb-1 border-2 rounded border-gray-300 text-sm px-2">
//             <label>فلتر نتایج جستجو:</label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="" disabled hidden>همه دسته‌بندی‌ها</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div
//             onClick={() => setShowFilter(!showFilter)}
//             className="mb-1 border-2 rounded border-gray-300 text-sm px-2"
//           >
//              <label>ترتیب به اساس موفقیت:</label>
//              <select onChange={handleSelectAddress}>
//                <option value="">همه </option>
//                  <option value="" disabled hidden>موقعیت</option>
//                  {locations.map((loc, index) => (
//                    <option key={index} value={loc}>
//                      {loc}
//                    </option>
//                  ))}
//             </select>
//           </div>

//           {/* مرتب‌سازی قیمت */}
//           <div className="border-2 mb-2 rounded border-gray-300 text-sm px-2">
//             <label>ترتیب به اساس قیمت:</label>
//             <select
//               onChange={(e) => setSortType(e.target.value)}
//               className="text-sm px-2"
//             >
//               <option value="relavent">عمومی</option>
//               <option value="low-high">صعودی</option>
//               <option value="high-low">نزولی</option>
//             </select>
//           </div>
//         </div>

//         {/* نمایش محصولات */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 gap-y-6">
//           {filterProducts.map((item, index) => (
//             <ProductItem
//               key={index}
//               id={item._id}
//               name={item.title}
//               price={item.price}
//               address={item.location}
//               date={item.createdAt}
//               image={item.imagesURLs?.[0]} // اگر فقط اولین عکس رو نمایش بدی
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collection;
