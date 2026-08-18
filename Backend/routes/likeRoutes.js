const express = require('express');
const {likePost, unlikePost} = require('../controllers/likeController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/like', protect, likePost);
router.post('/like', protect, unlikePost);

module.exports = router;

