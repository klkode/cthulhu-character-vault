import './OccupationSkillsSubform.scss';

function OccupationSkillsSubform( {chosenBackground, choicesLists, occupationalSkillsList, setOccupationalSkillsList} ) {

    function selectHandler(event, index){
        const skillId = event.target.value;
        const chosenSkill = choicesLists[index].find((skill) => skill.skill_id === Number(skillId));
        chosenSkill.points = chosenSkill.base_value;
        const skillUpdate = [...occupationalSkillsList];
        skillUpdate[index] = chosenSkill;
        setOccupationalSkillsList(skillUpdate);
    }

    function onChangeHandler(event, index){
        const {name, value} = event.target;
        const skillUpdate = [...occupationalSkillsList];
        skillUpdate[index][name] = value;
        setOccupationalSkillsList(skillUpdate);
    }

    return (
        <fieldset className="occupation-skills" form="add-skills-form">
            <h3 className="occupation-skills__heading">Occupational Skills</h3>
            {!!chosenBackground &&
            <div className="occupation-skills__container">
                {occupationalSkillsList.map((singleSkill, index) => {
                    return ( 
                    <div className="occupation-skills__selections-container" key={index}>
                        {choicesLists[index].length === 1
                        ?<p className="occupation-skills__option occupation-skills__option--only">
                            {!singleSkill.name ? choicesLists[index][0].name : singleSkill.name}
                        </p>
                        :<div className="dropdown occupation-skills__dropdown">
                            <button className="btn btn-secondary dropdown-toggle occupation-skills__option occupation-skills__option--default" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {!singleSkill.name ? "Choose a Skill": singleSkill.name}
                            </button>
                            <ul className="dropdown-menu occupation-skills__dropdown-menu">
                                {choicesLists[index].map((skill) => {
                                    return (
                                        <li className="occupation-skills__option-container" key={skill.skill_id}>
                                            <button className="dropdown-item occupation-skills__option" type="button" value={skill.skill_id} onClick={(event) => selectHandler(event, index)}>{skill.name}</button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>}
                        <div className="occupation-skills__points-container">
                            <input className="occupation-skills__points-box" name="points" value={!singleSkill.points ? (!singleSkill.base_value ? "" : singleSkill.base_value) : singleSkill.points} onChange={(event) => onChangeHandler(event, index)} type="number" min="1" max="99" step="1" />
                        </div>     
                    </div>
                    );
                })}
            </div>
            }
        </fieldset>
    );
}

export default OccupationSkillsSubform;