const express=require('express');
const router = express.Router();

const upload=require("../middleware/uploadMiddleware");
const {uploadResume}=require("../controllers/resumeController");
const authMiddleware=require("../middleware/authMiddleware");

router.post("/upload", authMiddleware, upload.single("resume"), uploadResume);

module.exports = router;