const express = require("express");
const router = express.Router();

const { getSuggestions } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/suggestions", authMiddleware, getSuggestions);

module.exports = router;