// routes/categoryRoutes.js
const express = require("express")
const upload=require('../../middlewares/upload.js')
const  createCategory = require('../../controllers/categoryController-A.js')
const protectRoute= require( '../../middlewares/protectRoute.js')

const router = express.Router();

router.post('/categories-A', protectRoute, upload.single('image'), createCategory);

module.exports= router;
