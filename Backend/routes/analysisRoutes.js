const express = require("express");
const router = express.Router();
const { analyzeResume } = require("../controllers/analysisController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/analysis/analyze
router.post("/analyze", authMiddleware, analyzeResume);

module.exports = router;