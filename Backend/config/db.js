const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const MONGO_URI=process.env.MONGO_URI;

const connectDB=async()=>{
    try{
      await mongoose.connect(MONGO_URI);
      console.log("Database Connected Successfully.");
    }
    catch(err){
      console.log("Database Connection Failed.", err.message);
      process.exit(1);
    }
}

module.exports=connectDB;