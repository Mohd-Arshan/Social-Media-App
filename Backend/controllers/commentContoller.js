const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const commentOnPost = async (req, res) => {
    try {
        const {postId} = req.params;
        const userId = req.user.id;
        const {text} = req.body;

        if(!text){
            return res.status(400).json({ message: "Text is required" });
        }

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            text: text,
            userId: userId,
            postId: postId
        }); 

        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();
        
        res.status(201).json({message: "Commented successfully", Comment: newComment});

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}