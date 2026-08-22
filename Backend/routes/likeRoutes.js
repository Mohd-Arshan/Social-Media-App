const express = require('express');
const {likePost, unlikePost} = require('../controllers/likeController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/likeById', protect, likePost);
router.post('/unlikeById', protect, unlikePost);

module.exports = router;

