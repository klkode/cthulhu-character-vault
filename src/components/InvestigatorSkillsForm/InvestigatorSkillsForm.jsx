import { useState, useEffect } from 'react';
import BackgroundSelection from '../BackgroundSelection/BackgroundSelection';
import axios from 'axios';
import { BASE_URL } from '../../constant-variables';
import './InvestigatorSkillsForm.scss';
import OccupationalSkillsSelection from '../OccupationalSkillsSelection/OccupationalSkillsSelection';

function InvestigatorSkillsForm({backgroundValue, inputValues, updateBackground, updateSkills, previous, next}) {
  
  const [skillsList, setSkillsList] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);

  function updateSelectedBackground(backgroundObject){
    updateBackground("background_id", backgroundObject.background_id);
    setSelectedBackground(backgroundObject);

  }

  useEffect(() => {
      const getSkills = async () => {
          try{
              const response = await axios.get(`${BASE_URL}skills`);
              setSkillsList(response.data);
          }catch(error){
              console.error(error);
              // TODO: Do something about this?
          }
      }
      getSkills();
      
  }, []);

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

  return (
    <form className="skills-form" id="add-skills-form" name="add-skills-form">
      <h2 className="skills-form__heading" >Investigator Background and Skills</h2>
        <BackgroundSelection selectedId={backgroundValue} updateSelectedBackground={updateSelectedBackground} />
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