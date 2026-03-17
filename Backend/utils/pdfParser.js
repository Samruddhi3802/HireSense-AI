const { PDFParse } = require("pdf-parse");

async function extractTextFromPdf(buffer) {
  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  } catch (error) {
    console.error("PDF parsing error :", error);
    throw new Error("PDF Parsing Failed");
  }
}

module.exports = extractTextFromPdf;