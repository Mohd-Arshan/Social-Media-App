const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');

const likePost = async (res, req) => {

    try {
        const postId= req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }

        if(post.likes.includes(userId)){
            return res.status(400).json({ message: "You are already liked this Post" });
        }

        post.likes.push(userId);

        await post.save();

        res.status(201).json({message: "Liked successfully"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const unlikePost = async(res, req) => {
    try {
        const postId= req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }

        if(!post.likes.includes(userId)){
            return res.status(400).json({ message: "You have not liked this Post" });
        }

        post.likes = post.likes.filter(id => id.toString() !== userId);

        await post.save();

        res.status(201).json({message: "Unliked successfully"});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    likePost,unlikePost
};