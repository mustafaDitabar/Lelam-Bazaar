// routes/adRoutes.js
const express =require("express")

const router = express.Router();
const { getAllAdds } = require("../controllers/adds-A-RoutesController");
const protectRoute = require("../middlewares/protectRoute");


router.get('/adds-ADMIN',protectRoute, getAllAdds); // مسیر گرفتن همه آگهی‌ها

module.exports= router;
