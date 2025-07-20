// // routes/add.routes.js

// const express = require("express");
// const router = express.Router();

// const { getAddById } = require("../controllers/addControler");

// router.get('/:id', getAddById);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { getAddById } = require("../controllers/addControler");  // مسیر درست

router.get('/:id', getAddById);

module.exports = router;


// // فرض بر این است که از Express استفاده می‌کنید
// const express =require("express")
// const router = express.Router();
// // const Add =require("../models/addProducts.js")
// const Add =require("../../backend/models/addProducts")

// // دریافت یک آگهی بر اساس آیدی
// router.get('/:id', async (req, res) => {
//   try {
//     const add = await Add.findById(req.params.id);
//     if (!add) {
//       return res.status(404).json({ message: 'آگهی پیدا نشد' });
//     }
//     res.json(add);
//   } catch (err) {
//     res.status(500).json({ message: 'خطا در دریافت آگهی', error: err.message });
//   }
// });

// // export default router;
// module.exports= router;