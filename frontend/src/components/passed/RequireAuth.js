// import { useLocation,Navigate,Outlet } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";



// const RequiredAuth =({allowedRoles})=>{
//     const location = useLocation();
//   const { auth } = useContext(AuthContext);
// console.log("نقش دریافتی:", auth?.userInfo?.roles, typeof auth?.userInfo?.roles);

//   return auth?.userInfo?.roles?.find(role =>allowedRoles?.includes(role))?(<Outlet/>)
//     :auth?.accessToken ?(<Navigate to="/unAuthorized " state= {{from:location}} replace />)
//     :(<Navigate to="login" state={{from:location}} replace />)

// }
// export default RequiredAuth;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const RequiredAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);


  console.log("auth:", auth);
console.log("auth?.userInfo?.roles:", auth?.userInfo?.roles);
  // تبدیل شیء roles به آرایه
  const userRolesObject = auth?.userInfo?.roles;
  const userRoles = Object.entries(userRolesObject || {})
    .filter(([_, value]) => Boolean(value))
    .map(([key]) => key);



  // بررسی مجوز دسترسی
  const hasAccess = userRoles.some(role => allowedRoles.includes(role));
console.log("hasAccess:", hasAccess);

  return hasAccess ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unAuthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
