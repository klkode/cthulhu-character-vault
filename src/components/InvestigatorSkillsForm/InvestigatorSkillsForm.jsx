import { useState, useEffect } from 'react';
import BackgroundSelection from '../BackgroundSelection/BackgroundSelection';
// import axios from 'axios';
// import { BASE_URL } from '../../constant-variables';
import './InvestigatorSkillsForm.scss';
import OccupationalSkillsSelection from '../OccupationalSkillsSelection/OccupationalSkillsSelection';

function InvestigatorSkillsForm({backgroundValue, inputValues, updateBackground, updateSkills, previous, next, skillsList, backgroundList}) {
  
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [personalDropdownsAmt, setPersonalDropdownsAmt] = useState(1);

  function resetOccupationSkills(){
    for (let i = 1; i < 8; i++){
      updateSkills(`occupationalSkill${i}`, "");
    }
    
  }

  function updateSelectedBackground(backgroundObject){
    updateBackground("background_id", backgroundObject.background_id);
    setSelectedBackground(backgroundObject);
    resetOccupationSkills();

  }

  // If a new background is selected, then the previous occupation skills with it need to be wiped
  function updateSelectedBackgroundById(id){
    const foundBackground = backgroundList.find((background) => background.background_id === Number(id));
    updateBackground("background_id", id);
    setSelectedBackground(foundBackground);
    resetOccupationSkills();

  }

  function addPersonalDropdown(){
    setPersonalDropdownsAmt(personalDropdownsAmt + 1);
  }

  function removePersonalDropdown(){
    if(personalDropdownsAmt > 1){
      setPersonalDropdownsAmt(personalDropdownsAmt - 1);
    }else{
      setPersonalDropdownsAmt(1);
    }
  }

  useEffect(() => {
      if(backgroundValue !== ""){
        updateSelectedBackgroundById(backgroundValue);
      }else{
        setSelectedBackground(null);
      }
      
  }, [backgroundValue]);

  function getOptionSkills(backgroundOption){
    const optionFilter = backgroundOption.choices;
    let options;
    if(backgroundOption.is_choice){
      if(backgroundOption.is_category){
        // The skill must be from a particular category of skills
        options = skillsList.filter((skill) => skill.category === optionFilter);

      }else if(backgroundOption.is_all){
        // The skill can be any skill (excluding Cthulhu Mythos and Credit Rating)
        options = skillsList.filter((skill) => skill.name !== "Credit Rating" || skill.name !== "Cthulhu Mythos");

      }else{
          //The skill is a specific set of skill options
          const skillIds = optionFilter.split(",");
          options = skillsList.filter((skill) => skillIds.includes(String(skill.skill_id)));

      }
    }else{
      // Only one option
      options = [skillsList.find((skill) => skill.skill_id === Number(optionFilter))];

    }

    return options;

  }

  function cancelClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TODO navigate back to home or previous page?
  }

  function previousClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    previous();
  }

  function nextClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TODO validate the page inputs before continuing to next state

    next();
  }

  console.log(inputValues);

  return (
    <form className="skills-form" id="add-skills-form" name="add-skills-form">
      <h2 className="skills-form__heading" >Investigator Background and Skills</h2>
        <BackgroundSelection selectedId={backgroundValue} updateSelectedBackground={updateSelectedBackground} backgroundList={backgroundList}/>
      <fieldset className="skills-form__occupation-skills-container">
        <h3>Occupational Skills</h3>
        {!!selectedBackground &&
          selectedBackground.options.map((option) => {
            return <OccupationalSkillsSelection key={option.option} optionNumber={option.option} choices={getOptionSkills(option)} selected={inputValues[`occupationalSkill${option.option}`]} updateSkills={updateSkills}/>
          })
        }
        
      </fieldset>
      <fieldset className="skills-form__personal-skills-container">
        <h3>Personal Interest Skills</h3>
        {}
        
      </fieldset>
      <div className="skills-form__btn-container">
        <button className="skills-form__btn" onClick={previousClickHandler}>Previous</button>
        <button className="skills-form__btn skills-form__btn--cancel" onClick={cancelClickHandler} >Cancel</button>
        <button className="skills-form__btn" onClick={nextClickHandler}>Next</button>
      </div>
    </form>
  );
}

export default InvestigatorSkillsForm;