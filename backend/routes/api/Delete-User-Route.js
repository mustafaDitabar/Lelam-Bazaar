// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { deleteUser } = require("../../controllers/Delete-User.Controller");
const protectRoute = require("../../middlewares/protectRoute");

// حذف کاربر با احراز هویت
router.delete("/users-Delete-A/:id", protectRoute, deleteUser);

module.exports = router;
