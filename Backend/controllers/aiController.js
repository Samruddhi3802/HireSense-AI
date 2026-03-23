const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const { getResumeSuggestions } = require("../services/aiService");

exports.getSuggestions = async (req, res) => {
    try {

        const { resumeId } = req.body;
        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        if (resume.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const analysis = await Analysis.findOne({ resume: resumeId });

        if (!analysis) {
            return res.status(404).json({ message: "Analysis not found" });
        }

        const { missingSkills, matchedSkills, score } = analysis;

        const suggestions = await getResumeSuggestions(
            resume.resumeText,
            missingSkills,
            matchedSkills,
            score
        );

        res.json({
            message: "AI suggestions generated",
            suggestions
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to generate suggestions" })
    }
}