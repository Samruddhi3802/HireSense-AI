function calculateATSScore(matched, jdSkills){
    if(jdSkills.length === 0) return 0;

    const score = (matched.length/jdSkills.length) * 100;
    
    return Math.round(score);
}

module.exports = calculateATSScore;