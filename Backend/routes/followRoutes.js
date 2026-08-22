const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/followById", protect, followUser);
router.post("/unfollowById", protect, unfollowUser);

module.exports = router;