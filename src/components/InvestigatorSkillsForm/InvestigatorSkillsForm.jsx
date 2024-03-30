import { useState, useEffect, useCallback } from 'react';
import BackgroundSelection from '../BackgroundSelection/BackgroundSelection';
import './InvestigatorSkillsForm.scss';
import PersonalSkillsSubform from '../PersonalSkillsSubform/PersonalSkillsSubform';
import OccupationSkillsSubform from '../OccupationSkillsSubform/OccupationSkillsSubform';

function InvestigatorSkillsForm({backgroundValue, inputValues, updateBackground, updateSkills, previous, next, skillsList, backgroundList}) {
  
  // Create state variables for the selected background, an array of selected occupation skills, and awwary of selected personal skills, and an array for the options available for occupation skills
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [bgChoicesList, setBGChoicesList] = useState([[], [], [], [], [], [], [], []]);
  const [occupationalSkillsList, setOccupationalSkillsList] = useState(inputValues.occupationalSkills);
  const [personalSkillsList, setPersonalSkillsList] = useState(inputValues.personalSkills);

  // An empty skill object to use for reseting a skill value
  const emptySkill = {
    skill_id: "",
    name: "",
    base_value: "",
    points: ""
  }

  // An array of (8) empty skill objects for when all occupation skills need to be reset (such as when switching backgounds)
  const defaultOccupationalSkills = [
    emptySkill, emptySkill, emptySkill, emptySkill, emptySkill, emptySkill, emptySkill, emptySkill
  ];

  // Remove all data from the occupation skills list
  function resetOccupationSkills(){
    const resetSkills ={
      occupationalSkills: defaultOccupationalSkills,
      personalSkills: personalSkillsList
    }
    setOccupationalSkillsList(defaultOccupationalSkills);
    updateSkills(resetSkills);

  }

  // update the parent state variable with the current occupation and personal skills lists
  function updateAllSkills(){
   
    const updatedSkills = {
      occupationalSkills: occupationalSkillsList,
      personalSkills: personalSkillsList
    }

    updateSkills(updatedSkills);
  }

  function updateOccupationChoicesOnly(backgroundObject){
    const backgroundChoices = [[], [], [], [], [], [], [], []];
    for(let i = 0; i < backgroundObject.options.length; i++){
      backgroundChoices[i] = getOptionSkills(backgroundObject.options[i]);
    }
    setBGChoicesList(backgroundChoices);
  }

  // 
  function updateOccupationSkills(backgroundObject){
    const backgroundChoices = [[], [], [], [], [], [], [], []];
    for(let i = 0; i < backgroundObject.options.length; i++){
      backgroundChoices[i] = getOptionSkills(backgroundObject.options[i]);
    }
    
    const occupationSkills = defaultOccupationalSkills;
    for(let i = 0; i < backgroundChoices.length; i++){
      if(backgroundChoices[i].length === 1){
        const onlyChoice = {
          skill_id: backgroundChoices[i][0].skill_id,
          name: backgroundChoices[i][0].name,
          base_value: backgroundChoices[i][0].base_value,
          points: backgroundChoices[i][0].base_value
        }
        occupationSkills[i] = onlyChoice;
      }
    }
    setBGChoicesList(backgroundChoices);
    setOccupationalSkillsList(occupationSkills);
  }
  
  // When a background object is changed, the occupational skills should be updated accordingly or reset completely if no background object exists
  function updateSelectedBackground(backgroundObject){
    updateBackground("background_id", backgroundObject.background_id);
    setSelectedBackground(backgroundObject);
    if(!!backgroundObject){
      updateOccupationSkills(backgroundObject);
    }else{
      resetOccupationSkills();
    }
    
  }

   // When a background object is changed, the occupational skills should be updated accordingly or reset completely if no background object exists
  function updateSelectedBackgroundById(id){
    const foundBackground = backgroundList.find((background) => background.background_id === Number(id));
    updateBackground("background_id", id);
    setSelectedBackground(foundBackground);
    if(!!foundBackground){
      updateOccupationChoicesOnly(foundBackground);
    }else{
      resetOccupationSkills();
    }

  }

//   const updateBGbyId = useCallback((id) => {
// const foundBackground = backgroundList.find((background) => background.background_id === Number(id));
//     updateBackground("background_id", id);
//     setSelectedBackground(foundBackground);
//     if(!!foundBackground){
//       updateOccupationSkills(foundBackground);
//     }else{
//       resetOccupationSkills();
//     }
//   },[]);

  // useEffect(()=>{
  //   updateBGbyId(backgroundValue)
  // }, [backgroundValue, updateBGbyId]);

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
        <BackgroundSelection 
          selectedId={backgroundValue} 
          updateSelectedBackground={updateSelectedBackground} 
          backgroundList={backgroundList}/>
        <OccupationSkillsSubform 
          chosenBackground={selectedBackground} 
          choicesLists={bgChoicesList} 
          occupationalSkillsList={occupationalSkillsList} 
          setOccupationalSkillsList={setOccupationalSkillsList} />
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