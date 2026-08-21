const express = require("express");
const {createPost, getAllPosts, updatePost, deletePost, getRecommendedPosts, getPostsByUserId} = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/create',protect,createPost);
router.get('/getAll',protect,getAllPosts);
router.patch('/update/:postId',protect,updatePost);
router.delete('/delete',protect,deletePost);
router.get('/getPostsByUserId/:userId',protect,getPostsByUserId);
router.get('/recommend-posts',protect,getRecommendedPosts);

module.exports = router;