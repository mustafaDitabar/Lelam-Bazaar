const express =require("express") 

const {
  deleteAd,
  updateAd,
  removeImage,
  uploadImage,
} = require("../controllers/User-Adds-Controller") 

const router = express.Router();
const upload = require("../middlewares/upload")

// روت‌ها
router.delete("/adds-ADMIN/:id", deleteAd);
router.put("/adds-A/:id", updateAd);
router.put("/adds-A/remove-image/:id", removeImage);
router.post("/adds-A/upload-image/:id", upload.single("image"), uploadImage);

module.exports= router;
