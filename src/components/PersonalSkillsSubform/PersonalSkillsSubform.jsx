import { useState } from 'react';
import './PersonalSkillsSubform.scss';

function PersonalSkillsSubform({skills, personalSkillsList, setPersonalSkillsList}) {
    // Magic state variable that makes the rows delete
    const [toggle, setToggle] = useState(true);

    const emptySkill = {
        skill_id: "",
        name: "",
        base_value: "",
        points: ""
    }

    function selectHandler(event, index){
        const skillId = event.target.value;
        const chosenSkill = skills.find((skill) => skill.skill_id === Number(skillId));
        chosenSkill.points = chosenSkill.base_value;
        const skillUpdate = [...personalSkillsList];
        skillUpdate[index] = chosenSkill;
        setPersonalSkillsList(skillUpdate);
    }

    function onChangeHandler(event, index){
        const {name, value} = event.target;
        const skillUpdate = [...personalSkillsList];
        skillUpdate[index][name] = value;
        setPersonalSkillsList(skillUpdate);
    }

    function removeBtnHandler(event, index){
        // Make sure form doesn't reload
        event.preventDefault();

        const skillRemoval = personalSkillsList;
        skillRemoval.splice(index, 1);
        setPersonalSkillsList(skillRemoval);
        // For some reason updating the skills list doesn't refactor the component so use magic state variable
        setToggle(!toggle);
    }

    function addBtnHandler(event){
        // Make sure form doesn't reload
        event.preventDefault();
        setPersonalSkillsList([...personalSkillsList, emptySkill])
    }

    return (
        <fieldset className="personal-skills" form="add-skills-form">
            <h3 className="personal-skills__heading">Personal Skills</h3>
            <div className="personal-skills__container">
                {personalSkillsList.map((singleSkill, index) => {
                    return ( 
                    <div className="personal-skills__selections-container" key={index}>
                        <div className="personal-skills__row-container">
                            {index === 0 
                            ? <p className="personal-skills__option">{singleSkill.name}</p>
                            :<div className="dropdown personal-skills__dropdown">
                                <button className="btn btn-secondary dropdown-toggle personal-skills__option personal-skills__option--default" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {!singleSkill.name ? "Choose a Skill": singleSkill.name}
                                </button>
                                <ul className="dropdown-menu personal-skills__dropdown-menu">
                                    {skills.map((skill) => {
                                        return (
                                            <li className="personal-skills__option-container" key={skill.skill_id}>
                                                <button className="dropdown-item personal-skills__option" type="button" value={skill.skill_id} onClick={(event) => selectHandler(event, index)}>{skill.name}</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>}
                            <div className="personal-skills__points-container">
                                <input className="personal-skills__points-box" name="points" defaultValue={!singleSkill.points ? (!singleSkill.base_value ? "" : singleSkill.base_value) : singleSkill.points} onChange={(event) => onChangeHandler(event, index)} type="number" min="1" max="99" step="1" />
                            </div>
                            {(personalSkillsList.length > 1 && index !== 0) &&
                            <button className="personal-skills__delete-btn" onClick={(event)=>removeBtnHandler(event, index)}>Remove</button>
                            }       
                        </div>
                        {(personalSkillsList.length - 1 === index) &&
                        <div className="personal-skills__add-btn-container">
                            <button className="personal-skills__add-btn" onClick={addBtnHandler}>Add</button>
                        </div>
                        }
                    </div>
                    );
                })}
            </div>
        </fieldset>
    );
}

export default PersonalSkillsSubform;