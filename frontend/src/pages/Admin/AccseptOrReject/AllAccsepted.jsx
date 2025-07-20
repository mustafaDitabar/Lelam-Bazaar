import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import ProductItem from './Accsept';
import axios from '../../../api/axios';

function LatestCollection() {
  const { auth } = useContext(AuthContext);
  const [latestProducts, setLatestProducts] = useState([]);
   const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        const token = auth?.accessToken;
        const res = await axios.get('/api/adds-ADMIN', {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        setLoading(false);

        setLatestProducts(res.data);
      } catch (err) {
        console.error('❌ خطا در دریافت آگهی‌ها:', err);
      }
    }

    if (auth?.accessToken) {
      fetchLatestProducts();
    }
  }, [auth]);

if (loading) {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className='rtl my-10 font-tracfick ' >
     

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4'>
{latestProducts.map((item, index) => (
  <ProductItem key={index} ad={item} />
))}

        
    
      </div>

      
    </div>
  );
}

export default LatestCollection;


