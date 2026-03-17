const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.registerUser = async (req, res)=>{
    try {
        const {name, email, password}=req.body;

        // Basic Input Validation
        if(!name || !email || !password){
            return res.status(400).json({message:"Please provide all required fields."});
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Please provide a valid email address."});
        }

        // Password strength validation
        if(password.length < 6) {
            return res.status(400).json({message:"Password must be at least 6 characters long."});
        }

        const existingUser=await User.findOne({email});

        //checking if user already exists
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        //hashing the password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);

        //create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })

        //create token for auto-login
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.cookie("token", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(201).json({
            message:"User registered and logged in successfully",
            userId:user._id
        });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({message:"Internal server error"});
    }

}

exports.loginUser = async (req, res)=>{
    try {
        const {email, password}=req.body;
        
        // Basic Input Validation
        if(!email || !password){
            return res.status(400).json({message:"Please provide email and password."});
        }

        //check user
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //compare password
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //create token
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.cookie("token", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).status(200).json({
            message:"Login Successful",
            userId:user._id
        });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({message:"Internal server error"});
    }
    
}