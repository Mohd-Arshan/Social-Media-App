const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/follow", protect, followUser);
router.post("/unfollow", protect, unfollowUser);

module.exports = router;