import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "../api/axios";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuth } = useAuthContext();

	const logout = async () => {
		setLoading(true);

		
try {
	const res = await axios.post("/api/auth/logout");
  
	const data = res.data;
	if (data.error) {
	  throw new Error(data.error);
	}
  
	localStorage.removeItem("chat-user");
	setAuth(null);
	window.location.href = "https://google.com"; // خروج کامل از سیستم

		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
