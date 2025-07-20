const express = require('express') 
const protectRoute =require('../middlewares/protectRoute.js') 
const updateCategory =require('../controllers/Update-A-Controller.js')
const upload =require('../middlewares/upload.js' ) // multer middleware

const router = express.Router();

// PUT - آپدیت دسته‌بندی
router.put('/:id', protectRoute, upload.single('image'), updateCategory);


module.exports= router
