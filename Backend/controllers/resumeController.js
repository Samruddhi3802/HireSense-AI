const Resume = require("../models/Resume");
const extractTextFromPdf = require("../utils/pdfParser");

exports.uploadResume = async (req, res) => {
  try {

    console.log("Uploaded File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPdf(req.file.buffer);

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ message: "Unable to extract text from PDF" });
    }

    console.log("Extracted Text Length:", resumeText.length);

    // Check if the user has already uploaded this exact resume
    const existingResume = await Resume.findOne({ user: req.user.userId, resumeText: resumeText });

    if (existingResume) {
      return res.status(400).json({
        message: "This resume has already been uploaded by you."
      });
    }

    // Save resume to DB
    const resume = await Resume.create({
      user: req.user.userId,
      fileName: req.file.originalname,
      resumeText: resumeText
    });

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id
    });

  } catch (error) {

    console.error("Resume Upload Error:", error);

    res.status(500).json({
      message: "Resume upload failed",
      error: error.message
    });

  }
};