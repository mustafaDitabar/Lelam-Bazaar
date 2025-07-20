
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation"; // ✅ اضافه‌شده

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const { setConversations } = useConversation(); // ✅ مکالمات را در Zustand می‌ریزیم
	const { auth } = useAuthContext();

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			const userId = auth?.userInfo?._id;
	         const token = auth?.accessToken;
			try {
const { data } = await axios.get("/api/conversationUsers", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
console.log(data,"دیتاااا");
const userId = auth?.userInfo?._id;
const formattedConversations = data
  .filter(conv => conv.participants.length === 2)
  .map(conv => {
    const other = conv.participants.find(p => p._id !== userId);
    if (!other) return null;
    return {
      _id: conv._id,
      user: {
        _id: other._id,
        username: other.username,
        photo: other.photo,
      }
    };
  })
  .filter(Boolean);


setConversations(formattedConversations);

			} catch (error) {
				console.error("⚠️ Failed to fetch users:", error.message);
			} finally {
				setLoading(false);
			}
		};

		if (auth?.accessToken) {
			getConversations();
		}
	}, [auth, setConversations]);

	return { loading };
};

export default useGetConversations;

