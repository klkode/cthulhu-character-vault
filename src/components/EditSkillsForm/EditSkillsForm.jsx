import "./EditSkillsForm.scss";
import CancelButton from "../CancelButton/CancelButton";
import { useEffect, useState } from "react";
import { validateUpdatedSkills } from "../../utils/character-validation";
import BackgroundSelection from "../BackgroundSelection/BackgroundSelection";
import EditSkillField from "../EditSkillField/EditSkillField";

function EditSkillsForm( {backgroundId, backgrounds, updateBackground, skillInputs, skills, updateSkill, previous, next} ){
    
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

    function previousClickHandler(event){
        event.preventDefault();

        const errors = validateUpdatedSkills(skillInputs);
        if(errors.hasError){
            setErrMessages(errors);
        }else{
            setErrMessages(noErrors);
            previous();
        }
        
    }

    function nextClickHandler(event){
        event.preventDefault();
        
        const errors = validateUpdatedSkills(skillInputs);
        if(errors.hasError){
            setErrMessages(errors);
        }else{
            setErrMessages(noErrors);
            next();
        }

    }

    function backgroundSelect(backgroundObject){
        if(!backgroundObject){
            updateBackground("background_id", "");
        }else{
            updateBackground("background_id", backgroundObject.background_id);
        }
    }

    
    function setSkillsDetails(skillDetails, characterSkills){

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
            <div className="edit-stats-form__stats-container">
                <BackgroundSelection selectedId={backgroundId} updateSelectedBackground={backgroundSelect} backgroundList={backgrounds}/>
                <fieldset className="edit-skills-form__skills-container">
                    <div className="edit-skills-form__table-container">
                        {skillList.map((skill) =>{
                            return <EditSkillField key={skill.skill_id} id={skill.skill_id} name={skill.name} value={skill.points} updateSkill={updateSkill} error={errMessages.skillErrs}/>
                        })}
                    </div>
                </fieldset>
            </div>
            <div className="edit-skills-form__btn-container">
                <button className="edit-skills-form__btn" onClick={previousClickHandler}>Previous</button>
                <CancelButton />
                <button className="edit-skills-form__btn" onClick={nextClickHandler}>Next</button>
            </div>
        </form>
    );
}

export default EditSkillsForm;