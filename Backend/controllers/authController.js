const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');


//register
const register = async (req,res) =>{
    try {
        const { full_name,email,username,password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            full_name,
            email,
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



//login
const  login = async (req,res) =>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

        res.status(200).json({
            message: "Login successful",
            user: { 
                id: user._id,
                full_name: user.full_name,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//logout
const logout = async (req,res) =>{
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const me = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

//update a user by id
const updateUserById = async (req,res) =>{
    //Can be Implemented later
}
//delete a user by id
const deleteUserById = async (req,res) =>{
    //Can be Implemented later
}


module.exports = {
    register,
    login,
    logout,
    me,
};