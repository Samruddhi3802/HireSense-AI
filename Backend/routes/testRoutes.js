const express=require("express");

const router=express.Router();
router.get("/test", (req, res)=>{
    res.send("Backend test route working successfully...");
})

module.exports=router;