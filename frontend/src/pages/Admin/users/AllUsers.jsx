// pages/Admin/AllUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import UserCard from "./UserCard";
import { useAuthContext } from "../../../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { auth } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdTitle, setSelectedAdTitle] = useState("");
  const [selectedAdId, setSelectedAdId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = auth?.accessToken;
      console.log(token, "token");
      try {
        const response = await axios.get("/api/users-A", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("📦 کاربران:", response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("خطا در گرفتن کاربران:", err);
      }finally{
       setLoading(false);

      }
    };

    if (auth?.accessToken) {
      fetchUsers();
    }
  }, [auth?.accessToken]);

  const openDeleteModal = (id, username) => {
    setSelectedAdId(id);
    setSelectedAdTitle(username);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedAdId) return;

    const token = auth?.accessToken;

    try {
      await axios.delete(`/api/users-Delete-A/${selectedAdId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((user) => user._id !== selectedAdId));
    } catch (err) {
      console.error("خطا در حذف کاربر:", err);
    } finally {
      setShowDeleteModal(false);
      setSelectedAdId(null);
      setSelectedAdTitle("");
    }
  };

if (loading) {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
  return (
    <div>
      {/* لیست کاربران */}
      <div>
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            image={user.imagesURLs?.[0]}
            onDeleteClick={openDeleteModal} // اینجا مودال باز می‌شود
          />
        ))}
      </div>

      {/* پاپ‌آپ تایید حذف */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <div className="flex items-center gap-1 mb-1 justify-start text-left">
              <FaTrash className="text-blue-500" />
              <h2 className="font-semibold text-right">حذف کاربر</h2>
            </div>

            <p className="text-sm text-gray-600 text-right mb-4">
              آیا مطمئن هستید که می‌خواهید کاربر{' '}
              <span className="font-bold">{selectedAdTitle}</span> را حذف کنید؟
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 border px-4 py-1 rounded-lg h-[35px] w-[70px] hover:border-blue-400"
              >
                لغو
              </button>
              <button
                onClick={handleDelete}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg h-[35px] w-[70px] hover:bg-blue-600"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
