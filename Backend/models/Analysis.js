const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
    },
    jobDescription: {
        type: String,
        required: true,
    },
    matchedSkills: [String],
    missingSkills: [String],
    score: Number,
}, { timestamps: true });

// Prevent duplicate analyses for the same user + resume + job description
analysisSchema.index({ user: 1, resume: 1, jobDescription: 1 }, { unique: true });

module.exports = mongoose.model("Analysis", analysisSchema);