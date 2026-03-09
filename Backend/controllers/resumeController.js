const Resume=require("../models/Resume");
const extractTextFromPdf=require("../utils/pdfParser");

exports.uploadResume=async (req, res)=>{
    try {
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }

        const resumeText = await extractTextFromPdf(req.file.buffer);
        
        const resume = await Resume.create({
            user : req.user.userId,
            fileName : req.file.originalname,
            resumeText : resumeText
        })

        res.json({
            message : "Resume uploaded successfully",
            resumeId : resume._id
        })

    } catch (error) {
        res.status(500).json({message:"Resume upload failed"});
    }

}