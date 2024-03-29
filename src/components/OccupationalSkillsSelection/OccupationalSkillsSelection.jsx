// import { useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import './OccupationalSkillsSelection.scss';

function OccupationalSkillsSelection( {optionNumber, choices, selected, updateSkills} ) {
    const pointsRef = useRef();

    // useEffect(() =>{
    //     console.log("ue", selected);
    // },[selected]);

    function selectionHandler(event){
        // Get the skill id
        const skillId = Number(event.target.value);

        // Get the skill item
        let skillSelected;
        if(choices.length !== 1){
            skillSelected = choices.find((skill) => skill.skill_id === skillId);
        }else{
            skillSelected = choices[0];
        }

        // Assign the base value of this skill to the object and as the value of the points input field 
        pointsRef.current.value = skillSelected.base_value;
        skillSelected.points = skillSelected.base_value;
        // setPoints(skillSelected.base_value)
        
        // updateSkills(`occupationalSkill${optionNumber}`, skillSelected);
        updateSkills(optionNumber, skillSelected);
    }

    function loadHandler(event){
        const skill = choices[0];
        if(!selected){
            skill.points = skill.base_value;
            // updateSkills(`occupationalSkill${optionNumber}`, skill);
            updateSkills(optionNumber, skill);
        }
    }

    function changeHandler(event){
        const points = event.target.value;

        // Avoid error of having nothing selected (because there was no choice) by setting the skill to the only choice
        let skill = selected;
        if(!selected){
            skill = choices[0];
        }
        skill.points = points;
        // setPoints(points);
        // updateSkills(`occupationalSkill${optionNumber}`, skill);
        updateSkills(optionNumber, skill);
    }

    return (
        <div className="occupation-skill">
            <div className="occupation-skill__selection-container">
                <label className="occupation-skill__label">{`Skill ${optionNumber}`}</label>
                {choices.length === 1
                ? <p className="occupation-skill__choice-box" onLoad={loadHandler}>{choices[0].name}</p>
                : <div className="dropdown occupation-skill__dropdown">
                    <button className="btn btn-secondary dropdown-toggle occupation-skill__option occupation-skill__option--default" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {!selected ? "Choose a Skill": selected.name}
                    </button>
                    <ul className="dropdown-menu occupation-skill__dropdown-menu">
                        {choices.map((skill) => {
                            return (
                                <li className="occupation-skill__option-container" key={skill.skill_id}>
                                    <button className="dropdown-item occupation-skill__option" type="button" value={skill.skill_id} onClick={selectionHandler}>{skill.name}</button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                }
            </div>
            <div className="occupation-skill__selection-container">
                <label className="occupation-skill__label" htmlFor="points">Points: </label>
                <div className="occupation-skill__input-container">
                    <input className="occupation-skill__points-box" name="points" id="points" type="number" min="1" max="99" step="1" defaultValue={!selected ? ((choices.length === 1) ? choices[0].base_value : "") : selected.points } onChange={changeHandler} ref={pointsRef}/>
                    <label className="occupation-skill__error" htmlFor="points"></label>
                </div>
            </div>
        </div>
    );
}

export default OccupationalSkillsSelection;