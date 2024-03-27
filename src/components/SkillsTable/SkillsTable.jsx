import './SkillsTable.scss';
import SkillsRow from '../SkillsRow/SkillsRow';

function SkillsTable({skills}) {
    
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
                <h4 className="skills-table__heading">Hard Success Threshold</h4>
            </div>
            <div className="skills-table__extreme-container">
                <h4 className="skills-table__heading">Extreme Success Threshold</h4>
            </div>
        </div>
        <div className="skills-table__rows-container">
        {skills.length === 0
            ? <div className="skills-table__no-results">no skills found for those filters</div> //TODO make nicer
            : skills.map((skill) => {
                return <SkillsRow key={skill.skill_id} id={skill.skill_id} points={skill.points} /> //TODO get skill object
            })}
        </div>
    </article>
  );
}

export default SkillsTable;