import React,{ useEffect, useRef, useState } from "react";
import loginImg from'../../photo/20943830.jpg'
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuthContext } from "../../context/AuthContext";
import { BASE_URL } from '../../api/axios';
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const USERNAME_REGEX = /^[\u0600-\u06FFa-zA-Z][\u0600-\u06FFa-zA-Z0-9]{2,22}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[\u0600-\u06FFa-zA-Z]).{8,24}$/;
const LOGIN_URL = "/auth";


const googleAuth = ()=>{
  window.open(`${BASE_URL}/auth/google`,"_self")
}


const Login = ()=>{

const [loading, setLoading] = useState(false);
const {setAuth} = useAuthContext();
const navigate = useNavigate() ;
const location = useLocation();
const from  = location.state?.from?.pathname || "/";

const [username,setUsername]=useState("");
const [isValidUn,setIsValidUn] = useState(false);
const [unFocus,setUnFocus] =useState(false);

const [Pwd,setPwd]=useState("");
const [isValidPwd,setIsValidPwd] = useState(false);
const [PwdFocus,setPwdFocus] =useState(false);
const [showForgot, setShowForgot] = useState(false);
const [showValidationMsg, setShowValidationMsg] = useState(false);


const [errMsg,setErrMsg] = useState("");


useEffect(()=>{
    usernameRef?.current?.focus();
},[])


useEffect(()=>{
    setIsValidUn(USERNAME_REGEX.test(username));
},[username]);


useEffect(()=>{
    setIsValidPwd(PWD_REGEX.test(Pwd));
    

},[Pwd,])



useEffect(()=>{
    setErrMsg('');
},[username,Pwd])


const handleSubmit = async (e)=>{
    e.preventDefault();

    if (!isValidUn || !isValidPwd  ) {
      setShowValidationMsg(true);
      setTimeout(() => setShowValidationMsg(false), 3000);
      return; // جلو ارسال درخواست رو بگیر
    }
setLoading(true);
try {
  
const response = await axios.post(LOGIN_URL,{username, password :Pwd},{
    headers:{"Content-type": "application/json"},
    withCredentials:true
  })



const data = response.data;
console.log(data,"data");
setAuth({
  userInfo: {
    ...data.userInfo,
  },
  accessToken: data.accessToken,
});

localStorage.setItem("chat-user", JSON.stringify({
  userInfo: data.userInfo,
  accessToken: data.accessToken,
}));


setUsername("");
setPwd("");

console.log(data.userInfo.roles,"admin");
    if (data.userInfo.isAdmin) {
      navigate("/admin-panel");
    } else {
      navigate("/"); // مسیر معمولی
    }
  



} catch (err) {
  console.log(err)
if(!err?.response){
  setErrMsg("پیامی از سمت سرور دریافت نشد ")
}else if(err.response?.status ===400){
  setErrMsg("نام کاربری و رمز عبور تمیتواند خالی باشد ")
}else if(err.response?.status === 409) {
  setErrMsg(" نام کاربری یا رمز عبور درست نیست است ")
  }
else if(err.response?.status === 401) {
setErrMsg("نام کاربری یا رمز عبور اشتباه است ")
}else {
  setErrMsg(`خطایی پیش آمد: ${err.response?.status}`)
}


}finally {
  setLoading(false);
}

};


const usernameRef = useRef(null);
const passwordRef = useRef(null);
const submitBtnRef = useRef(null);

 const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
        e.preventDefault();
        nextRef?.current?.focus();
    }
};



    return(
<div className="h-[calc(100vh-44px)] dark:bg-blackbg  w-full flex justify-center items-center bg-gray-100 pt-2 ">
      
     <div >
   
     <div className=" my-2 md:my-2 mt-2 md:mt-2 dark:bg-myColor flex flex-col p-2 md:p-0  bg-white  items-center h-[520px] w-[400px] 
          rounded-md shadow-md overflow-hidden">


<p className="text-center mt-1 font-black text-blue-400 text-2xl pt-3 dark:text-colorprimary pb-2">  ورود به سایت </p>

<div className=" flex items-center justify-center space-y-8">

<div className="w-52 h-51 inline-block ">


 
<img className="w-[100px] mr-[45px] " src={loginImg} alt="" />  
  
     
      </div>
  </div>

    <form  onSubmit={handleSubmit} className="flex flex-col justify-center pt-4 items-center w-full  ">
                {errMsg && (<p className=" bg-red-300 text-center m-2 w-[300px] h-[30px] rounded-md text-red-500"> {errMsg}</p>)}

                
                <div className="w-[300px] mr-15 mt-6 dark:text-colorwhite ">
                     <input
                     ref={usernameRef}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                     required
                     autoComplete="off"
                     value={username}
                     onChange={(e)=> setUsername(e.target.value)}
                     onFocus={()=>setUnFocus(true)}
                     onBlur={()=> setUnFocus(false)}
                    
                     placeholder="نام کاربری" type="text "  className=" textInput dark:bg-colorfieldbg dark:text-colorwhite " /> 
                     <p className={` errMsg mb mt-1 
                         ${!isValidUn && unFocus && username ? "visible":"hidden"
                         }`}>
                        نام کاربری باید بیشتر از سه کاراکتر باشد 
                        </p>
                     </div>
                    <div className="w-[300px] mt-6 mb-1 mr-15 ">
                        <input 
                        ref={passwordRef}
                     onKeyDown={(e) => handleKeyDown(e, submitBtnRef)}
                        required
                        onChange={(e)=>setPwd(e.target.value)}
                        onFocus={()=>setPwdFocus(true)}
                        onBlur={()=>setPwdFocus(false)}
                        
                        placeholder=" رمز عبور "  type="password" className=" dark:focus-non textInput dark:bg-colorfieldbg dark:text-colorwhite1 " /> 
                        <p 
                        className={`mt-0 mb-2 errMsg mt-1  ${
                        !isValidPwd && Pwd && PwdFocus ? "visible":"hidden"
                        }`}> 
                            پسورد بیشتر از 8 کاراکتر و علائم @#$% باشد
                              </p>
                        </div>
 



  <button
  ref={submitBtnRef}
  className="cynBtn mt-5 bg-blue-400 hover:bg-blue-500 text-white "disabled={loading}
  onClick={(e) => {
    if (!isValidUn || !isValidPwd ) {
      e.preventDefault();
      setShowValidationMsg(true);
      setTimeout(() => setShowValidationMsg(false), 3000);
      return;
    }
    
     else {
      setShowValidationMsg(false); // همه چیز اوکیه، پیام رو مخفی کن
      handleSubmit(e); // تابع ارسال فرم
    }
  }}
>
{loading ? <span className='loading loading-spinner'></span> : " ورود به حساب کاربری"}
 
</button>

<p 
  className={` mb-2  errMsg text-right ${
    showValidationMsg ? "visible" : "hidden"
  }`}
>
  نام کاربری و رمز عبور الزامی است!
</p>

    </form>
            <div className="flex justify-center items-center"> 
                <span className="text-gray-500 dark:text-colorwhite1">حساب کابری ندارید؟</span>
            <Link className="mr-2 text-blue-400 font-semibold  hover:text-blue-500" to="/register">  ثبت نام</Link>
            </div>

                           <div >
                           <button  onClick={() => setShowForgot(true)}  className="text-blue-400 hover:text-blue-500 ">
                                رمز عبور را فراموش کردید؟     
                           </button>
                           </div>
            <div className="mt-3 ">
                <button onClick={googleAuth} className="flex ring-1  hover:ring shadow items-center justify-center  w-[160px] h-[25px] focus:outline-none ring-blue-400   rounded-md  text-gray-500"
                >
                  <p className="size-6  mr-1 mt-2 "><FcGoogle /></p>
                  <p className="pm-1 text-colorprimary  ">  با گوگل وارد شوید</p>
                  
                </button>
                </div>
</div>

</div>

{showForgot && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <ForgotPassword onClose={() => setShowForgot(false)} />
  </div>
)}
</div>

);   
}

export default Login;