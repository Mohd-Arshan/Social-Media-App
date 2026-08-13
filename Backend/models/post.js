const mongoose = require('mongoose');
const User = require('./user');
const Comment = require('./comment');

const postSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    userId: {type: String, ref: "User", required: true},
    image: {type: String, default: ""},
    title: {type: String, default: ""},
    description: {type: String, default: ""},
    likes: [{type: String, ref: "User"}],
    comments: [{type: String, ref: "Comment"}],
},{timestamps: true,minimize: false});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;