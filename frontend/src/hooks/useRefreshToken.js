import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate(); // برای هدایت به صفحه ورود

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });

      setAuth(prev => ({
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      }));

      return response.data.accessToken;

    } catch (error) {
      console.log(" Refresh Token منقضی یا نامعتبر شده:", error.message);

      setAuth({}); // پاک کردن وضعیت احراز هویت
      navigate("/login", { replace: true }); // هدایت به صفحه ورود

      throw error; // خطا رو بنداز بالا تا باقی سیستم هم بفهمه
    }
  };

  return refresh;
};

export default useRefreshToken;