const pdf = require("pdf-parse");

const extractTextFromPdf=async (buffer)=>{
    try {
        const data=await pdf(buffer);
        return data.text;
    } catch (error) {
        throw new Error("PDF Parsing Failed");
    }
}

module.exports=extractTextFromPdf;