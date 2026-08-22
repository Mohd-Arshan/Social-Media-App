const User = require("../models/user");
const mongoose = require('mongoose');


const getProfileById = async (req, res) => {
    try{
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        } 
        user = await User.findById(userId).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getRecommendedProfiles = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        if (!currentUser) {
            return res.status(404).json({ message: "Current user not found" });
        }

        const recommendedProfiles = await User.find({ 
            _id: { 
                $ne: currentUser._id, 
                $nin: currentUser.following 
            }  
        }).select('-password');


        res.status(200).json(recommendedProfiles);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getProfileById,
    getRecommendedProfiles
};