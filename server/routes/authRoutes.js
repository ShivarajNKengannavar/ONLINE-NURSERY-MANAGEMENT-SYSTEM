const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { register, login, getProfile } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);

module.exports = router;
