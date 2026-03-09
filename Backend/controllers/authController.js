const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config();

exports.registerUser = async (req, res)=>{
    try {
        const {name, email, password}=req.body;
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

        res.status(200).json({
            message:"User registered successfully",
            userId:user._id
        })

    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }

}

exports.loginUser = async (req, res)=>{
    try {
        const {email, password}=req.body;
        
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

        res.json({
            message:"Login Successful",
            token
        })

    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
    
}