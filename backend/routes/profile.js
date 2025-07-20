const express = require('express');
const router = express.Router();
const updateProfile = require('../controllers/profile');
const upload = require("../middlewares/upload");
const protectRoute = require('../middlewares/protectRoute');

router.put("/profile", protectRoute, upload.single("photo"), updateProfile);

module.exports= router;