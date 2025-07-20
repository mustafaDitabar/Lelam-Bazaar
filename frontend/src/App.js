

import { Route, Routes ,Navigate, useLocation} from "react-router-dom";
import { Toaster } from "react-hot-toast";
// صفحات عمومی
import CategoryPage from '.././src/components/Category-All-By_ID';
import { DarkModeProvider } from './context/DarkModeContext';

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
// import Unauthorized from "./components/Unauthorized";
import Profile from "./pages/Profile/profile";
//ismat
import { FaReact } from 'react-icons/fa';
import Home from './pages/Home/Home';
import Collection from './pages/Collection';
// import About from './pages/';
// import Cart from './components/';
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'; 
import Navbar from './components/Navbar';
import RequireAccsess from "./components/passed/RequireAccsess";
import Footer from './components/Footer';
import Categories from './pages/Categories';
import SearchBar from './components/SearchBar';
import AdminPanel from './pages/Admin/AdminPanel'
import { DarkModeContext } from "./context/DarkModeContext";
import { useEffect, useContext } from "react";

// صفحات محافظت‌شده (Protected)
import RequiredAuth from "./components/passed/RequireAuth";
;
// نقش‌ها
const ROLES = {
  Admin: "Admin",
  User: "User",
};




function App() {

<FaReact size={40} color="#61DBFB" />

   const location = useLocation();


   const hideFooter =
     location.pathname === "/profile" ||
     location.pathname === "/login" ||
     location.pathname === "/register" ||
     location.pathname === "/admin-panel" ||
     location.pathname === "/placeOrder" ||
     /^\/product\/[^/]+$/.test(location.pathname);


 const hideNavbar = 
 location.pathname === "/admin-panel";


  const showSearchBar = location.pathname === "/collection";


 const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  return (

    <>

        {!hideNavbar && <Navbar />}  {/* اگر hideNavbar بود، Navbar نمایش داده نشود */}

<div className={`min-h-screen flex flex-col ${!hideNavbar ? 'pt-[43px]' : ''}`}>    {showSearchBar && <SearchBar />}

        <Routes>

          {/* 📁 مسیرهای عمومی */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path='/' element={ <Home />} /> */}
          {/* <Route path='/chat' element={auth ? <Chat /> : <Navigate to='/login' />} /> */}
          {/* <Route path='/profile' element={auth ? <profile/> : <Navigate to='/login' />} /> */}

          {/* <Route path='/chat' element={ <Chat/>} /> */}
				<Route path='/login' element={ <Login />} />
				<Route path='/register' element={ <Register />} />
        <Route path='/profile' element={ <Profile/>} />
{/* ismat */}
       <Route path="/category/:categoryId" element={<CategoryPage />} />

        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>}/>
        {/* <Route path='/about' element={<About/>}/> */}
        {/* <Route path='/contact' element={<Contact/>}/> */}
        {/* <Route path='/cart' element={<Cart/>}/> */}
        {/* <Route path='/Orders' element={<Orders/>}/> */}
        <Route path="/placeOrder"element={ <RequireAccsess>  <PlaceOrder/> </RequireAccsess> } />
                {/* {!hideFooter && <Footer />} */}

       <Route path="/product/:productId" element={<Product />} />
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/categories' element={<Categories />} />  {/* ← این خط اضافه شد */}





        {/* <Route path='/login' element={auth ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={auth? <Navigate to='/' /> : <Register />} /> */}

          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

          🔐 مسیرهای محافظت‌شده بر اساس نقش
          <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin-panel" element={<AdminPanel/>} />
          </Route>

          {/* <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/users" element={<Users />} />
          </Route> */}

          {/* ❌ مسیر 404 - در صورت نیاز فعال شود */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>

       <Toaster/>

        {!hideFooter && <Footer />}
     
       
      </div>

    </>
     

  );
}

export default App;
