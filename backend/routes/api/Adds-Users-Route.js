const express =require("express") 
const  getUserAds  =require("../../controllers/Adds-Users-Controller.js") 
const protectRoute =require("../../middlewares/protectRoute.js") 

const router = express.Router();

// گرفتن آگهی‌های مخصوص یک کاربر خاص
router.get("/adds-Users/:userId", protectRoute, getUserAds);

module.exports= router;
