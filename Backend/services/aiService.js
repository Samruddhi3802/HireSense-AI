const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

async function getResumeSuggestions(resumeText, missingSkills, matchedSkills, score) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const prompt = `
        You are an advanced ATS system and career coach.

        Analyze the resume based on the following:

        ATS Score : ${score}
        Matched Skills : ${matchedSkills.join(", ")}
        Missing Skills : ${missingSkills.join(", ")}

        Resume : 
        ${resumeText}

        Give:
        1. Suggestions to improve ATS score
        2. How to include missing skills
        3. Improvements in projects/experience
        4. Overall feedback
        
        Return STRICT JSON:
        {
        "scoreAnalysis": "",
        "missingSkillsAdvice": "",
        "improvementTips": [],
        "projectSuggestions": [],
        "finalSummary": ""
        }
        `;

        const result = await model.generateContent(prompt);

        const response = await result.response;
        const text = response.text();

        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}") + 1;

        const jsonString = text.slice(jsonStart, jsonEnd);

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Gemini Error : ", error);
        throw new Error("AI Suggestion Failed");
    }
}

module.exports = {
    getResumeSuggestions
};
