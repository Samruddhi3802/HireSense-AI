const mongoose = require('mongoose');

const resumeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    fileName:{
        type:String,
        required:true
    },

    resumeText:{
        type:String,
        required:true
    },

    uploadDate:{
        type:Date,
        default:Date.now
    }
}, {timestamps:true});

module.exports=mongoose.model("Resume", resumeSchema);