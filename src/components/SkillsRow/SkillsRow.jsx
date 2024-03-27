import './SkillsRow.scss';

function SkillsRow({ id, points }) {
 //TODO get skill object
    return (
        <div className="skills-row">
            <div className="skills-row__skill-container">
                <p className="skills-row__name">{id}</p>
            </div>
            <div className="skills-row__base-container">
                <p className="skills-row__value">{points}</p>
            </div>
            <div className="skills-row__hard-container">
                <p className="skills-row__value">{(Math.floor(points/2)) === 0 ? 1 : Math.floor(points/2)}</p>
            </div>
            <div className="skills-row__extreme-container">
                <p className="skills-row__value">{(Math.floor(points/5)) === 0 ? 1 : Math.floor(points/5)}</p>
            </div>
        </div>
    );
}

export default SkillsRow;