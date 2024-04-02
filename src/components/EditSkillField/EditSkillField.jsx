import "./EditSkillField.scss";

function EditSkillField( {id, name, value, updateSkill, error} ){

    function onChangeHandler(event){
        const {name, value} = event.target;
        const index = name.replace("Skill", "");
        updateSkill(Number(index), value);
    }

    return(
        <div className="skill-field">
            <div className="skill-field__input-container">
                <label className="skill-field__label" htmlFor={`Skill${id}`}>{name}</label>
                <input className={!error[id] ? "skill-field__text-box" : "skill-field__text-box skill-field__text-box--error"} id={`Skill${id}`} name={`Skill${id}`} onChange={onChangeHandler} type="number" min="0" max="99" step="1" value={value} />
            </div>
            <label className="skill-field__error" htmlFor={`Skill${id}`}>{error[id]}</label>
        </div>
    );
}

export default EditSkillField