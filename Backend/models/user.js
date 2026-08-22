const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    full_name: {type: String},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    bio : {type: String, default: "Hey there! I am using Social Media App."},
    profile_picture: {type: String, default:""},
    cover_picture: {type: String, default:""},
    location: {type: String, default:""},
    followers: [{type: String, ref: "User"}],
    following: [{type: String, ref: "User"}],
},{timestamps: true,minimize: false});

const User = mongoose.model("User", userSchema);

module.exports = User;