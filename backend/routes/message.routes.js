const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controllers/message.controller");
const upload = require("../middlewares/upload"); // multer middleware
const protectRoute = require("../middlewares/protectRoute");

router.post("/send/:id", protectRoute, upload.single("image"), sendMessage);
router.get("/:id", protectRoute, getMessages);

module.exports = router;

