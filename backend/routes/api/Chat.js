const express = require("express");
const router = express.Router();
const ChatController = require("../../controllers/chat");
const protectRoute = require("../../middleware/protectRoute");

router.get("/", protectRoute,ChatController);  // مسیر GET
//router.post("/", verifyJWT, ChatController.Chat); // مسیر POST

module.exports = router;
