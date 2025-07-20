const express =require('express') 
const getDashboardStats  =require('../controllers/Chart-AllUser-AllAdd.js') 
const protectRoute =require('../middlewares/protectRoute.js') 

const router = express.Router();

// گرفتن آمار کلی داشبورد - فقط برای ادمین
router.get('/dashboard-stats', protectRoute, getDashboardStats);

module.exports= router;
