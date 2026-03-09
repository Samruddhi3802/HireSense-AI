const mongoose = require('mongoose');

const resumeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    fileName:{
        type:String
    },

    resumeText:{
        type:String
    },

    uploadDate:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Resume", resumeSchema);