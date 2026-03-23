const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const testRoute = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const aiRoutes = require("./routes/aiRoutes");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use("/api", testRoute);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/ai", aiRoutes)

connectDB();

app.get("/", (req, res) => {
    res.send("HireSense AI Backend running successfully");
})

app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
})