// routes/adRoutes.js
const express =require("express")

const router = express.Router();
const { getAllAdds } = require("../controllers/addsRoutesController");
const protectRoute = require("../middlewares/protectRoute");


router.get('/adds', getAllAdds); // مسیر گرفتن همه آگهی‌ها
router.get('/adds-A',protectRoute, getAllAdds); // مسیر گرفتن همه آگهی‌ها

module.exports= router;
