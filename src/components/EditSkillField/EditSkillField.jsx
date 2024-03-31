import "./EditSkillField.scss";

function EditSkillField( {id, name, value, updateSkill, error} ){

    function onChangeHandler(event){
        const {name, value} = event.target;
        const index = name.replace("Skill", "");
        updateSkill(Number(index), value);
    }

    return(
        <div className="skill-field">
            <label className="skill-field__label" htmlFor={`Skill${id}`}>{name}</label>
            <div className="skill-field__input-container">
                <input className={!error ? "skill-field__text-box" : "skill-field__text-box skill-field__text-box--error"} id={`Skill${id}`} name={`Skill${id}`} onChange={onChangeHandler} type="number" min="0" max="99" step="1" value={value} />
                <label className="skill-field__error" htmlFor={`Skill${id}`}>{error}</label>
            </div>
        </div>
    );
}

export default EditSkillField