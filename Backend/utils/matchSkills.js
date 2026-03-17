function matchSkills(resumeSkills, jdSkills) {
    const matched = resumeSkills.filter(skill =>
        jdSkills.includes(skill)
    );

    const missing = jdSkills.filter(skill =>
        !resumeSkills.includes(skill)
    );

    return { matched, missing };
}

module.exports = matchSkills;
