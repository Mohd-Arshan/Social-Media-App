const express = require("express");
const { getRoomId, getMessages} = require("../controllers/conversationController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getRoomId/:id", protect, getRoomId);
router.get("/getMessages/:roomId", protect, getMessages);

module.exports = router;