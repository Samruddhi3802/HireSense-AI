const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const testRoute=require("./routes/testRoutes");
const authRoutes=require("./routes/authRoutes");

dotenv.config();
const app=express();

const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", testRoute);
app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res)=>{
    res.send("HireSense AI Backend running successfully");
})

app.listen(PORT, ()=>{
    console.log("Server is listening on port ", PORT);
})