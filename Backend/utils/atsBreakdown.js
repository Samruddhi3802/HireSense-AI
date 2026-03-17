function atsBreakdown(score, matched, missing){
    return {
        overall_score : score,
        skills_match : score,
        missing_skills_count : missing.length,
        matched_skills_count : matched.length,
        recommendation: score>75
        ? "Good Match"
        : score>50
        ? "Moderate Match"
        : "Needs Improvement"
    };
}
    
module.exports = atsBreakdown;