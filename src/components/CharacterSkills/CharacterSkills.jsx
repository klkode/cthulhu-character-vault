import SkillsTable from '../SkillsTable/SkillsTable';
import './CharacterSkills.scss';

function CharacterSkills({skills, skillDetails}) {
    
  return (
    <article className="character-skills">
      <h3 className="character-skills__heading">Skills</h3>
      <div className="character-skills__filter-container">
        <input className="character-skills__search-bar" type="text" id="skillSearch" name="skillSearch" />
        <div className="character-skills__filter-group">
          <input className="character-skills__filter-box" type="checkbox" id="noBaseValues" name="noBaseValues" />
          <label className="character-skills__filter-option" htmlFor="noBaseValues">Exclude skills at base value</label>
        </div>
        <div className="character-skills__filter-container character-skills__filter-container--extras">
          {/* TODO do this better. dropdown of categories that can select and deselect multiple? */}
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noArts" name="noArts" />
            <label className="character-skills__filter-option" htmlFor="noArts">Exclude Arts/Crafts skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noFighting" name="noFighting" />
            <label className="character-skills__filter-option" htmlFor="noFighting">Exclude Fighting Specialization skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noFirearms" name="noFirearms" />
            <label className="character-skills__filter-option" htmlFor="noFirearms">Exclude Firearm Specialization skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noLanguage" name="noLanguage" />
            <label className="character-skills__filter-option" htmlFor="noLanguage">Exclude Language skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noLore" name="noLore" />
            <label className="character-skills__filter-option" htmlFor="noLore">Exclude Lore skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noModern" name="noModern" />
            <label className="character-skills__filter-option" htmlFor="noModern">Exclude Modern skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noPilot" name="noPilot" />
            <label className="character-skills__filter-option" htmlFor="noPilot">Exclude Pilot skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noScience" name="noScience" />
            <label className="character-skills__filter-option" htmlFor="noScience">Exclude Science Specialization skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noSurvival" name="noSurvival" />
            <label className="character-skills__filter-option" htmlFor="noSurvival">Exclude Survival skills</label>
          </div>
          <div className="character-skills__filter-group">
            <input className="character-skills__filter-box" type="checkbox" id="noUncommon" name="noUncommon" />
            <label className="character-skills__filter-option" htmlFor="noUncommon">Exclude Uncommon skills</label>
          </div>
        </div>
      </div>
      <SkillsTable skills={skills} skillDetails={skillDetails} />
    </article>
  );
}

export default CharacterSkills;