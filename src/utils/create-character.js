
function statsAsInt(characterStats){
    const stats = {...characterStats};
    stats.strength = Number(stats.strength);
    stats.dexterity = Number(stats.dexterity);
    stats.constitution = Number(stats.constitution);
    stats.size = Number(stats.size);
    stats.appearance = Number(stats.appearance);
    stats.education = Number(stats.education);
    stats.intelligence = Number(stats.intelligence);
    stats.power = Number(stats.power);
    stats.luck = Number(stats.luck);

    stats.sanity = Number(stats.sanity);
    stats.magic_points = Number(stats.magic_points);
    stats.health = Number(stats.health);
    stats.build = Number(stats.build);
    stats.movement = Number(stats.movement);

    return stats;
}

function populateSkills(characterSkills, skillsList){
    const skillPoints = skillsList.reduce((reduction, skill) =>{
        reduction.push({ skill_id: Number(skill.skill_id), points: Number(skill.base_value)});
        return reduction;
    }, []);

    for(let index = 0; index < characterSkills.length; index++){
        const listIndex = skillPoints.findIndex((skill) => skill.skill_id === Number(characterSkills[0].skill_id));
        skillPoints[listIndex].points = Number(characterSkills[index].points);
    }

    return skillPoints;
}

export function createCharacterToPost(characterDetails, characterStats, characterSkills, skillsList){
    // Append all the data into one object
    const characterObject = {...characterDetails};
    
    characterObject.age = Number(characterObject.age);
    characterObject.background_id = Number(characterObject.background_id);
    
    characterObject.stats = statsAsInt(characterStats);
    
    const{ occupationalSkills, personalSkills } = characterSkills
    const skills = [...occupationalSkills, ...personalSkills];

    characterObject.skills = populateSkills(skills, skillsList);

    return characterObject;

}

export function createCharacterToUpdate(characterDetails, characterStats, characterSkills){
    // Append all the data into one object
    const characterObject = {...characterDetails};
    characterObject.age = Number(characterObject.age);
    characterObject.background_id = Number(characterObject.background_id);
    
    characterObject.stats = statsAsInt(characterStats);

    const skillBasics = characterSkills.reduce((reduction, skill) =>{
        reduction.push({ skill_id: skill.skill_id, points: Number(skill.points)});
        return reduction;
    }, []);
    characterObject.skills = skillBasics;

    return characterObject;
}

// export function filterAssignedSkills(characterSkills, skillsList, backgroundOptions){
//     const occupationalSkills = [{}, {}, {}, {}, {}, {}, {}, {}];
//     const personalSkills = [];

//     return {
//         occupationalSkills: occupationalSkills,
//         personalSkills: personalSkills
//     }
// }