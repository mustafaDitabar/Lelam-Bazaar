const express = require("express");
const router = express.Router();
const { getAdds, createAdd } = require("../controllers/addRoutesController");
const upload = require("../middlewares/upload");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAdds);
router.post("/", protectRoute, upload.array("images"), createAdd);

module.exports = router;

//کد سابق
// const express =require("express")
// const addProducts =require("../models/addProducts")
// const upload = require("../../backend/middlewares/upload")

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const adds = await addProducts.find().populate('categoryId');
//     res.status(200).json(adds);
//   } catch (error) {
//     console.error('❌ خطا در دریافت آگهی‌ها:', error);
//     res.status(500).json({ error: 'خطا در دریافت آگهی‌ها' });
//   }
// });

// router.post('/', upload.array('images'), async (req, res) => {
//   try {
//      console.log("🟡 بدنه‌ی دریافتی:", req.body); // اضافه کن
//     const {
//       title,
//       categoryId,
//       description,
//       phone,
//       location,
//       price
//     } = req.body;

//     const imageUrls = req.files.map(file => `http://localhost:3500/images/${file.filename}`);

//     const newAdd = new addProducts({
//       title,
//       categoryId,
//       description,
//       phoneNumber: phone,
//       location,
//       price,
//       imagesURLs: imageUrls
//     });

//     await newAdd.save();
//     res.status(201).json(newAdd);
//     console.log('✅ آگهی با موفقیت ذخیره شد:', newAdd);
//   } catch (error) {
//     console.error('❌ خطا در ذخیره آگهی:', error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // export default router
// module.exports= router;