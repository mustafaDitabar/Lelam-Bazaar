const express=require("express") 
const deleteAdById  =require ("../../controllers/Delete-Controller-A.js")
const protectRoute =require("../../middlewares/protectRoute.js") 

const router = express.Router();

// فقط کاربران لاگین‌شده بتوانند حذف کنند
router.delete("/Delete-add-A/:id", protectRoute, deleteAdById);

module.exports=router;
