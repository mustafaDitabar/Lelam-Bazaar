import React, { useEffect, useRef, useState } from "react";
import RegisterImg from'../../photo/5568706.jpg'
import { useAuthContext }  from '../../context/AuthContext'
import { BASE_URL } from '../../api/axios';
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { FcGoogle } from "react-icons/fc";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[\u0600-\u06FFa-zA-Z][\u0600-\u06FFa-zA-Z0-9]{2,22}$/;
const PWD_REGEX = /^(?=.*[\u0600-\u06FFa-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;                      
const REGISTER_URL = "/register";

const googleAuth = ()=>{
  window.open(`${BASE_URL}/auth/google`,"_self")
}
const Register = ()=>{
  // اسپنر
  const [loading, setLoading] = useState(false);

const {setAuth} =useAuthContext();

const [username,setUsername]=useState("");
const [isValidUn,setIsValidUn] = useState(false);
const [unFocus,setUnFocus] =useState(false);

const [Pwd,setPwd]=useState("");
const [isValidPwd,setIsValidPwd] = useState(false);
const [PwdFocus,setPwdFocus] =useState(false);

const [email, setEmail] = useState("");
const [isValidEmail, setIsValidEmail] = useState(false);
const [emailFocus, setEmailFocus] = useState(false);

const [showValidationMsg, setShowValidationMsg] = useState(false);

const [matchPwd,setMatchPwd] =useState("");
const [isValidMamtchPwd,setIsValidMamtchPwd] = useState(false);

const [errMsg,setErrMsg] = useState("");
 const navigate = useNavigate(); 
useEffect(()=>{
    usernameRef?.current?.focus();
},[])


useEffect(()=>{
    setIsValidUn(USERNAME_REGEX.test(username));
},[username]);


useEffect(()=>{
    setIsValidPwd(PWD_REGEX.test(Pwd));
    setIsValidMamtchPwd(Pwd===matchPwd);

},[Pwd,matchPwd])


useEffect(()=>{
    setErrMsg('');
},[username,Pwd])

useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
}, [email]);


const handleSubmit = async (e)=>{
    e.preventDefault();

const UnValidation = USERNAME_REGEX.test(username);
const PwdValidation = PWD_REGEX.test(Pwd);
const EmailValidation = EMAIL_REGEX.test(email);
if(!UnValidation || !PwdValidation|| !EmailValidation){
    return setErrMsg('اطلاعات را تکمیل کنید')
} 
// اسپنر
setLoading(true);

try {
    const response= await axios.post(
        REGISTER_URL,
        {username,password:Pwd,email},
        {
            headers:{"Content-Type":"application/json"},
            withCredentials:true
        }
      
    )
   
    const data = response.data;
    setAuth(data);
    
    localStorage.setItem("chat-user", JSON.stringify(data));

 navigate("/");
setUsername("");
setPwd("");
setMatchPwd("");
setEmail("");

} catch (error) {
   if(!error?.response ){
    setErrMsg("پیامی از سمت سرور دریافت نشد")
   }else if(error.response?.status ===409){
    setErrMsg("نام کاربری قبلا ثبت شده است ")
   }else {
    setErrMsg("خطای در هنگام ثبت نام رخ داد")
   }
    
  //  اسپنر

}finally {
			setLoading(false);
		}

}

const usernameRef = useRef(null);
const passwordRef = useRef(null);
const matchPwdRef = useRef(null);
const emailRef = useRef(null);
const submitBtnRef = useRef(null);

 const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
        e.preventDefault();
        nextRef?.current?.focus();
    }
};



    return(
<>


<section className="h-[calc(100vh-44px)]  bg-white text-black dark:bg-blackbg dark:text-white   w-full flex justify-center  items-center bg-gray-100 pt-2">
      
     <div >
     <div className=" my-2 md:my-2 mt-2 md:mt-2 dark:bg-myColor flex flex-col p-2 md:p-0  bg-white  items-center h-[520px] w-[400px] 
          rounded-md shadow-md overflow-hidden">
    

<p className="text-center mt-3 font-black text-blue-400 text-2xl dark:text-colorprimary pt-1">ثبت نام</p>

<div className=" flex items-center justify-center space-y-8">

<div className="w-52 h-51 inline-bock ">



<img className="w-[110px] mr-[45px] "  src={RegisterImg} alt="" />  
  
     
      </div>
  </div>

    <form  className="flex flex-col justify-center items-center w-full  ">
                {errMsg && (<p className=" bg-red-300 text-center mt-2 w-[300px] h-[30px] rounded-md text-red-500"> {errMsg}</p>)}


                <div>
                   <div className="w-full">
                     <input
                      ref={usernameRef}
                   onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                     required
                     autoComplete="off"
                     value={username}
                     onChange={(e)=> setUsername(e.target.value)}
                     onFocus={()=>setUnFocus(true)}
                     onBlur={()=> setUnFocus(false)}

                     placeholder="نام کاربری" type="text"  className=" dark:bg-colorfieldbg dark:text-colorwhite textInput  " /> 
                     <p className={` errMsg mb-2
                         ${!isValidUn && unFocus && username ? "visible":"hidden"
                         }`}>
                        نام کاربری باید بیشتر از سه کاراکتر باشد 
                        </p>
                     </div>
                    <div className="w-full mt-5">
                        <input 
                        ref={passwordRef}
                     onKeyDown={(e) => handleKeyDown(e, matchPwdRef)}
                        required
                        onChange={(e)=>setPwd(e.target.value)}
                        onFocus={()=>setPwdFocus(true)}
                        onBlur={()=>setPwdFocus(false)}
                        
                        placeholder=" پسورد" type="password" className=" textInput dark:bg-colorfieldbg dark:text-colorwhite " /> 
                        <p 
                        className={`mt-0 mb-2 errMsg ${
                        !isValidPwd && Pwd && PwdFocus ? "visible":"hidden"
                        }`}> 
                            پسورد بیشتر از 8 کاراکتر و علائم @#$% باشد
                              </p>
                        </div>
                    <div className="mt-5"> 
                        <input 
                      ref={matchPwdRef}
                        onKeyDown={(e) => handleKeyDown(e, emailRef)}
                            required
                            onChange={(e)=> setMatchPwd(e.target.value)}
                            value={matchPwd}


                        placeholder="تکرارپسورد" type="password" className="textInput dark:bg-colorfieldbg dark:text-colorwhite " />
                         <p className={`mt-0  errMsg ${!isValidMamtchPwd && matchPwd ? "visible":"hidden"}`} > پسورد یکسان نیست  </p>
                        </div>
                    </div>
                    
              <div className="w-full mt-5 ">
                    <input
                ref={emailRef}
                   onKeyDown={(e) => handleKeyDown(e, submitBtnRef)}
                         required
                         autoComplete="off"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         onFocus={() => setEmailFocus(true)}
                         onBlur={() => setEmailFocus(false)}
                         placeholder="ایمیل"
                         type="email"
                         className="textInput dark:bg-colorfieldbg dark:text-colorwhite mr-12 "
                   />
         <p className={`errMsg  mr-12 ${!isValidEmail && emailFocus && email ? "visible" : "hidden"}`}>
                                  ایمیل معتبر وارد کنید
                             </p>
                   </div>


                                                                   {/* اسپنر */}
                                
                        <button
                        ref={submitBtnRef}
  className="cynBtn mt-5 bg-blue-400 hover:bg-blue-500 hover-border-non text-white "disabled={loading}
  onClick={(e) => {
    if (!isValidUn || !isValidPwd || !isValidMamtchPwd ||!isValidEmail) {
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

{/* بخاطر اسپنر */}

{loading ? <span className='loading loading-spinner'></span> : "ثبت نام "}

</button>

<p 
  className={`mt-0 mb-2 errMsg text-right ${
    showValidationMsg ? "visible" : "hidden"
  }`}
>
  نام کاربری و رمز عبور الزامی است!
</p>



    </form>
            <div className="flex justify-center  mb-3 mt-1 items-center"> 
                <span className="text-gray-500 dark:text-colorwhite1">قبلا ثبت نام کردید؟</span>
            <Link className="mr-2 text-blue-400 font-semibold  hover:text-blue-500" to="/login">ورود </Link>
            </div>


     
            <div>
                <button onClick={googleAuth} className="flex ring-1  hover:ring shadw items-center justify-center   w-[175px] h-[25px] focus:outline-none ring-blue-400   rounded-md  text-gray-500"
                >
                    <p className="size-6 mt-2 mr-1 "><FcGoogle /></p>
                  <p className="pm-1 text-colorprimary ">با گوگل ثبت نام کنید</p>
                  
                </button>
                </div>
</div>

</div>


</section>


</>
    )
}


export default Register;