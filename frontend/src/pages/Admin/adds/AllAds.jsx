import React, { useEffect, useState } from "react";
import axios from "../../../../src/api/axios";
import AdCard from "./AdCard";
import { useAuthContext } from "../../../context/AuthContext";
import { FaTrash } from 'react-icons/fa';

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthContext();

  const [editAd, setEditAd] = useState(null);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [selectedAdTitle, setSelectedAdTitle] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      const token = auth?.accessToken;
      try {
        const response = await axios.get("/api/adds-A", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setAds(response.data);
      } catch (error) {
        console.error("خطا در گرفتن آگهی‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, [auth]);

  useEffect(() => {
    if (editAd) {
      setLocation(editAd.location || "");
      setCategory(editAd.category || "");
    }
  }, [editAd]);

  const confirmDelete = (id) => {
    const selectedAd = ads.find((ad) => ad._id === id);
    setSelectedAdId(id);
    setSelectedAdTitle(selectedAd?.title || "");
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/Delete-add-A/${selectedAdId}`, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });
      setAds((prev) => prev.filter((ad) => ad._id !== selectedAdId));
    } catch (err) {
      console.error("خطا در حذف آگهی:", err);
    } finally {
      setShowDeleteModal(false);
      setSelectedAdId(null);
      setSelectedAdTitle("");
    }
  };

  const handleEdit = (id) => {
    const selectedAd = ads.find((ad) => ad._id === id);
    setEditAd(selectedAd);
  };

  // اسپینر بارگذاری
if (loading) {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        {ads.map((item) => (
          <AdCard
            key={item._id}
            id={item._id}
            image={item.imagesURLs?.[0]}
            name={item.title}
            price={item.price}
            location={item.location}
            date={item.createdAt}
            onDelete={confirmDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* پاپ‌آپ تایید حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
<div className="flex items-center gap-1 mb-1 justify-start text-left">
  <FaTrash className=" text-blue-500 " />
  <h2 className="font-semibold text-right">حذف آگهی</h2>
</div>

            
            <p className="text-sm text-gray-600 text-right mb-4">
              آیا مطمئن هستید که می‌خواهید آگهی{' '}
              <span className="font-bold ">{ selectedAdTitle }</span> را حذف کنید؟
            </p>
           <div className="flex justify-end gap-4">
        <button
         onClick={() => setShowDeleteModal(false)}
         className="bg-gray-200 border px-4 py-1 rounded-lg h-[35px] w-[70px] hover:border-blue-400"
        >
        لغو
       </button>
        <button
        onClick={handleConfirmDelete}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg h-[35px] w-[70px] hover:bg-blue-600"
       >
    حذف
  </button>
</div>

          </div>
        </div>
      )}
    </>
  );
};

export default AllAds;
