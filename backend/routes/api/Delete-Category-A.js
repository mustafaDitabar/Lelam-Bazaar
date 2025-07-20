const protectRoute =require('../../middlewares/protectRoute.js') 

const express =require('express') 
const deleteCategory =require ('../../controllers/Delete-Category-A.js')

const router = express.Router();

// حذف دسته‌بندی با عکس
router.delete('/categories-Delete-A/:id', protectRoute, deleteCategory);

module.exports=router;
