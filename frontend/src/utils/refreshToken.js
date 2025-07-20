// src/services/authService.js
import axios from "../api/axios";
//import AuthContext from "../context/AuthContext"; // یا هر جایی که context داری

const refreshAccessToken = async (setAuth) => {
  try {
    const res = await axios.get("/refresh", {
      withCredentials: true,
    });

    const { accessToken, roles } = res.data;

    setAuth(prev => ({
      ...prev,
      accessToken,
      roles,
    }));

    return accessToken;
  } catch (error) {
    console.error("خطا در دریافت accessToken جدید:", error);
    return null;
  }
};

export default refreshAccessToken;
