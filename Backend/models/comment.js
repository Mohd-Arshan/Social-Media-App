const mongoose = require('mongoose');
const User = require('./user');

const commentSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    text: {type: String, require: true},
    postId: {type: String, ref: "Post", required: true},
    userId: {type: String, ref: "User", required: true},
},{timestamps: true,minimize: false});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;