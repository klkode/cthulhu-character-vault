import './SkillsTable.scss';
import SkillsRow from '../SkillsRow/SkillsRow';
import { useState } from 'react';

function SkillsTable({skills, skillDetails} ) {
    
    function mergeSkills(skills, skillDetails){
        const detailedSkills = [...skills];
        for(let index = 0; index < detailedSkills.length; index++){
            const skillDetail = skillDetails.find((detail) => detail.skill_id === detailedSkills[index].skill_id);
            detailedSkills[index].name = skillDetail.name;
            detailedSkills[index].base_value = skillDetail.base_value;
        }

        return detailedSkills;
    }

    const [displaySkills, setDisplaySkills] = useState(mergeSkills(skills, skillDetails));
    

    return (
        <article className="skills-table">
            <div className="skills-table__headings-container">
                <div className="skills-table__skill-container">
                    <h4 className="skills-table__heading">Name</h4>
                </div>
                <div className="skills-table__base-container">
                    <h4 className="skills-table__heading">Points</h4>
                </div>
                <div className="skills-table__hard-container">
                    <h4 className="skills-table__heading skills-table__heading--mobile">Hard</h4>
                    <h4 className="skills-table__heading skills-table__heading--bigger-breakpoint">Hard Success Threshold</h4>
                </div>
                <div className="skills-table__extreme-container">
                    <h4 className="skills-table__heading skills-table__heading--mobile">Extreme</h4>
                    <h4 className="skills-table__heading skills-table__heading--bigger-breakpoint">Hard Success Threshold</h4>
                </div>
            </div>
            <div className="skills-table__rows-container">
            {skills.length === 0
                ? <div className="skills-table__no-results">no skills found for those filters</div> //TODO make nicer
                : displaySkills.map((skill) => {
                    return <SkillsRow key={skill.skill_id} id={skill.skill_id} name={skill.name} points={skill.points} /> 
                })}
            </div>
        </article>
    );
}

export default SkillsTable;