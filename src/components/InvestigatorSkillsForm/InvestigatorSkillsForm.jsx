import { useState, useEffect } from 'react';
import BackgroundSelection from '../BackgroundSelection/BackgroundSelection';
// import axios from 'axios';
// import { BASE_URL } from '../../constant-variables';
import './InvestigatorSkillsForm.scss';
import OccupationalSkillsSelection from '../OccupationalSkillsSelection/OccupationalSkillsSelection';
import PersonalSkillsSubform from '../PersonalSkillsSubform/PersonalSkillsSubform';

function InvestigatorSkillsForm({backgroundValue, inputValues, updateBackground, updateSkills, previous, next, skillsList, backgroundList}) {
  
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [personalSkillsList, setPersonalSkillsList] = useState(inputValues.personalSkills);

  const [selectedOccupationSkill1, setSelectedOccupationSkill1] = useState(inputValues.occupationalSkill1);
  const [selectedOccupationSkill2, setSelectedOccupationSkill2] = useState(inputValues.occupationalSkill2);
  const [selectedOccupationSkill3, setSelectedOccupationSkill3] = useState(inputValues.occupationalSkill3);
  const [selectedOccupationSkill4, setSelectedOccupationSkill4] = useState(inputValues.occupationalSkill4);
  const [selectedOccupationSkill5, setSelectedOccupationSkill5] = useState(inputValues.occupationalSkill5);
  const [selectedOccupationSkill6, setSelectedOccupationSkill6] = useState(inputValues.occupationalSkill6);
  const [selectedOccupationSkill7, setSelectedOccupationSkill7] = useState(inputValues.occupationalSkill7);
  const [selectedOccupationSkill8, setSelectedOccupationSkill8] = useState(inputValues.occupationalSkill8);

  function setOccupationSkill(optionNum, value){
    switch(optionNum){
      case(1):
        selectedOccupationSkill1(value);
        break;
      case(2):
        selectedOccupationSkill2(value);
        break;
      case(3):
        selectedOccupationSkill3(value);
        break;
      case(4):
        selectedOccupationSkill4(value);
        break;
      case(5):
        selectedOccupationSkill5(value);
        break;
      case(6):
        selectedOccupationSkill6(value);
        break;
      case(7):
        selectedOccupationSkill7(value);
        break;
      case(8):
        selectedOccupationSkill8(value);
        break;
    }
  }

  function resetOccupationSkills(){
    const resetSkills = {
      occupationalSkill1: "",
      occupationalSkill2: "",
      occupationalSkill3: "",
      occupationalSkill4: "",
      occupationalSkill5: "",
      occupationalSkill6: "",
      occupationalSkill7: "",
      occupationalSkill8: ""
    }

    // Changing background should not reset the personal skills so append them after the fact
    resetSkills.personalSkills = inputValues.personalSkills;

    updateSkills(resetSkills);
  }

  function updateAllSkills(){
    const updatedSkills = {
      occupationalSkill1: selectedOccupationSkill1,
      occupationalSkill2: selectedOccupationSkill2,
      occupationalSkill3: selectedOccupationSkill3,
      occupationalSkill4: selectedOccupationSkill4,
      occupationalSkill5: selectedOccupationSkill5,
      occupationalSkill6: selectedOccupationSkill6,
      occupationalSkill7: selectedOccupationSkill7,
      occupationalSkill8: selectedOccupationSkill8
    }

    // Grab the personal skills
    updatedSkills.personalSkills = inputValues.personalSkills;

    updateSkills(updatedSkills);
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

  useEffect(() => {
    if(backgroundValue !== ""){
      updateSelectedBackgroundById(backgroundValue);
    }else{
      setSelectedBackground(null);
      resetOccupationSkills();
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
        options = skillsList.filter((skill) => !(skill.name === "Credit Rating" || skill.name === "Cthulhu Mythos"));

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
    
    updateAllSkills();
    previous();
  }

  function nextClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TODO validate the page inputs before continuing to next state
    updateAllSkills();
    next();
  }

  return (
    <form className="skills-form" id="add-skills-form" name="add-skills-form">
      <h2 className="skills-form__heading" >Investigator Background and Skills</h2>
        <BackgroundSelection selectedId={backgroundValue} updateSelectedBackground={updateSelectedBackground} backgroundList={backgroundList}/>
      <fieldset className="skills-form__occupation-skills-container">
        <h3>Occupational Skills</h3>
        {!!selectedBackground &&
          selectedBackground.options.map((option) => {
            return <OccupationalSkillsSelection key={option.option} optionNumber={option.option} choices={getOptionSkills(option)} selected={inputValues[`occupationalSkill${option.option}`]} updateSkills={setOccupationSkill}/>
          })
        }
        
      </fieldset>
      <PersonalSkillsSubform 
        skills={skillsList.filter((skill) => !(skill.name === "Credit Rating" || skill.name === "Cthulhu Mythos"))}  personalSkillsList={personalSkillsList} 
        setPersonalSkillsList={setPersonalSkillsList} />
      <div className="skills-form__btn-container">
        <button className="skills-form__btn" onClick={previousClickHandler}>Previous</button>
        <button className="skills-form__btn skills-form__btn--cancel" onClick={cancelClickHandler} >Cancel</button>
        <button className="skills-form__btn" onClick={nextClickHandler}>Next</button>
      </div>
    </form>
  );
}

export default InvestigatorSkillsForm;