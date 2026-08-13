const post = require("../models/post");
const user = require("../models/user");
const mongoose = require('mongoose');

const createPost = async (req, res) => {
  try {
    const {imageURL,...rest} = req.body;
    const userId = req.user.id;
    
    if(!imageURL){
      return res.status(400).json({message: "Image URL is required"});
    }

    if(!userId){
      return res.status(400).json({message: "User ID is required"});
    }

    if(!await user.findById(userId)){
      return res.status(404).json({message: "User not found"});
    }

    const newPost = new post({
      _id: new mongoose.Types.ObjectId(),
      userId,
      image: imageURL,
        ...rest
    });

    await newPost.save();
    res.status(201).json({message: "Post created successfully", post: newPost});
  }
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }

}

const getAllPosts = async (req, res) => {
  try {
    const posts = await post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  }
  catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { imageURL, ...rest } = req.body;
    const userId = req.user.id;

    const postToUpdate = await post.findById(postId);
    if (!postToUpdate) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (postToUpdate.userId !== userId) {
      return res.status(403).json({ message: "You are not authorized to update this post" });
    }

    if (imageURL) {
      postToUpdate.image = imageURL;
    }

    Object.assign(postToUpdate, rest);
    await postToUpdate.save();
    res.status(200).json({ message: "Post updated successfully", post: postToUpdate });

  }
    catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const postToDelete = await post.findById(postId);
    if (!postToDelete) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (postToDelete.userId !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this post" });
    }

    await postToDelete.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  }
    catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { createPost, getAllPosts, updatePost, deletePost };
