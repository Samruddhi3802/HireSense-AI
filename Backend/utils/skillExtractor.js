const skillsDB = require("./skillsDatabase");
const processText = require("./nlpProcessor");

function extractSkills(text) {
    const tokens = processText(text);
    const foundSkills = [];

    skillsDB.forEach(skill => {
        const skillTokens = processText(skill.name);

        const isMatch = skillTokens.every(token =>
            tokens.includes(token)
        );

        if (isMatch) {
            foundSkills.push(skill.name);
            return;
        }

        for (let variation of skill.variations) {
            const variationTokens = processText(variation);
            const variationMatch = variationTokens.every(token =>
                tokens.includes(token)
            );

            if (variationMatch) {
                foundSkills.push(skill.name);
                return;
            }
        }
    });

    return [...new Set(foundSkills)];
}

module.exports = extractSkills;