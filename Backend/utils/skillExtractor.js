const skillsDB = require("./skillsDatabase");

function normalize(text) {
    return text.toLowerCase().replace(/[^a-z0-9+]/g, " ");
}

function extractSkills(text) {
    if (!text) return []; // safety check
    const normalizedText = normalize(text);
    const foundSkills = [];
    skillsDB.forEach(skill => {
        //checking main skill
        if (normalizedText.includes(skill.name)) {
            foundSkills.push(skill.name);
            return;
        }

        //checking variations 
        for (let variation of skill.variations) {
            if (normalizedText.includes(variation)) {
                foundSkills.push(skill.name);
                return;
            }
        }
    });

    return [...new Set(foundSkills)];
}

module.exports = extractSkills;