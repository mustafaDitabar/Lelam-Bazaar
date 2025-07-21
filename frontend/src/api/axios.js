import axios from 'axios';

 export const BASE_URL ="https://lelam-bazaar-app-utzy.onrender.com/";

 export default   axios.create({

    baseURL:BASE_URL,
    withCredentials: true,
 });



 export const axiosPrivate = axios.create({
   baseURL : BASE_URL,
   withCredentials :true,
   headers: {"Content-Type":"application/json"},
  
   
   
 })