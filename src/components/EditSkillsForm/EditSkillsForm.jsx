import "./EditSkillsForm.scss";
import CancelButton from "../CancelButton/CancelButton";
import { useEffect, useState } from "react";
import { validateUpdatedSkills } from "../../utils/character-validation";
import BackgroundSelection from "../BackgroundSelection/BackgroundSelection";
import EditSkillField from "../EditSkillField/EditSkillField";

function EditSkillsForm( {backgroundId, backgrounds, updateBackground, skillInputs, skills, updateSkill, previous, next} ){
    // Create state variables for error messages and the skills to display
    const noErrors = {
        hasError: false,
        backgroundErr: "",
        skillErrs: []
    }
    const [errMessages, setErrMessages] = useState(noErrors);
    const [skillList, setSkillList] = useState([]);

    useEffect(() => {
        setSkillsDetails(skills, skillInputs);
    }, [skills, skillInputs])

    /**
     * previousClickHandler is a function to handle when the "previous" button is clicked. It uses the function passed down as a props to change the form component displayed to the form before this one in the page's progression. Validation is required in this case as there is already existing data.
     * 
     * @param {Object}      event
     * 
    */
    function previousClickHandler(event){
        // Stop page from reloading
        event.preventDefault();

        // Validate form input fields
        const errors = validateUpdatedSkills(skillInputs);
        if(errors.hasError){
            // Show error messages
            setErrMessages(errors);
        }else{
            // Set error messages back to default and go back to previous state
            setErrMessages(noErrors);
            previous();
        }
        
    }

    /**
     * nextClickHandler is a function to handle when the "next" button is clicked. It uses the function passed down as a props to change the form component displayed to the form after this one in the page's progression, if the inputs are successfully validated. Otherwise it will trigger the display of error messages.
     * 
     * @param {Object}      event
     * 
     */
    function nextClickHandler(event){
        // Stop page from reloading
        event.preventDefault();
        
        // Validate form input fields
        const errors = validateUpdatedSkills(skillInputs);
        if(errors.hasError){
            // Show error messages
            setErrMessages(errors);
        }else{
            // Set error messages back to default and go to next state
            setErrMessages(noErrors);
            next();
        }

    }

    /**
     * backgroundSelect is a function to act as a wrapper for updating the background id since the BackgroundSelection component returns the whole background object rather than just the id. So long as an object was passed (not null) then update the background_id with the object's background_id. Otherwise set it to nothing ("").
     * 
     * @param {Object}      backgroundObject
     * 
     */
    function backgroundSelect(backgroundObject){
        if(!backgroundObject){
            updateBackground("background_id", "");
        }else{
            updateBackground("background_id", backgroundObject.background_id);
        }
    }

    /**
     * setSkillsDetails is a function to add extra information stored in the skills list into the character skills list so that only one source of information is needed to be passed as a props to child component EditSkillField.
     * 
     * @param {Object[]}      skillDetails
     * @param {Object[]}      characterSkills
     * 
     */
    function setSkillsDetails(skillDetails, characterSkills){
        // Add the name and base values to the character skills list
        const skills = [...characterSkills];
        for(let index = 0; index < skills.length; index++){
            const skillDetail = skillDetails.find((detail) => detail.skill_id === skills[index].skill_id);
            skills[index].name = skillDetail.name;
            skills[index].base_value = skillDetail.base_value;
        }
        setSkillList(skills);
    }

    return (
        <form className="edit-skills-form" id="edit-skills-form" name="edit-skills-form">
            <h2 className="edit-skills-form__heading" >Investigator Background and Skills</h2>
            {/* <p className="edit-skills__instructions" ></p> */}
            <div className="edit-skills-form__container">
                <fieldset className="edit-skills-form__background-container">
                    <BackgroundSelection selectedId={backgroundId} updateSelectedBackground={backgroundSelect} backgroundList={backgrounds}/>
                </fieldset>
                <fieldset className="edit-skills-form__skills-container">
                    <div className="edit-skills-form__table-container">
                        {skillList.map((skill) =>{
                            return <EditSkillField key={skill.skill_id} id={skill.skill_id} name={skill.name} value={skill.points} updateSkill={updateSkill} error={errMessages.skillErrs}/>
                            // TODO seperate error messages
                        })}
                    </div>
                </fieldset>
            </div>
            <div className="edit-skills-form__btn-container">
                <div className="edit-skills-form__nav-btn-container">
                    <button className="edit-skills-form__btn" onClick={previousClickHandler}>Previous</button>
                    <button className="edit-skills-form__btn" onClick={nextClickHandler}>Next</button>
                </div>
                <div className="edit-skills-form__cancel-container edit-skills-form__cancel-container--mobile">
                    <CancelButton />
                </div>
            </div>
        </form>
    );
}

export default EditSkillsForm;