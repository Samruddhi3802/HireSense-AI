const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const extractSkills = require("../utils/skillExtractor");
const matchSkills = require("../utils/matchSkills");
const calculateATSScore = require("../utils/atsScore");
const atsBreakdown = require("../utils/atsBreakdown");

exports.analyzeResume = async (req, res) => {
    try {
        const { resumeId, jobDescription } = req.body;

        if (!resumeId || !jobDescription) {
            return res.status(400).json({ message: "Missing data" })
        }

        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        if (resume.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        // Check if this exact analysis already exists
        const existingAnalysis = await Analysis.findOne({
            user: req.user.userId,
            resume: resumeId,
            jobDescription: jobDescription
        });

        if (existingAnalysis) {
            const breakdown = atsBreakdown(
                existingAnalysis.score,
                existingAnalysis.matchedSkills,
                existingAnalysis.missingSkills
            );

            return res.json({
                ATS_score: existingAnalysis.score,
                matched_skills: existingAnalysis.matchedSkills,
                missing_skills: existingAnalysis.missingSkills,
                breakdown,
                cached: true
            });
        }

        //Extract Skills
        const resumeSkills = extractSkills(resume.resumeText);
        const jdSkills = extractSkills(jobDescription);

        //Match
        const { matched, missing } = matchSkills(resumeSkills, jdSkills);

        //Score
        const score = calculateATSScore(matched, jdSkills);

        //Breakdown
        const breakdown = atsBreakdown(score, matched, missing);

        const analysis = await Analysis.create({
            user: req.user.userId,
            resume: resume._id,
            jobDescription: jobDescription,
            matchedSkills: matched,
            missingSkills: missing,
            score
        });

        res.json({
            ATS_score: score,
            matched_skills: matched,
            missing_skills: missing,
            breakdown
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Analysis failed"
        })
    };
}