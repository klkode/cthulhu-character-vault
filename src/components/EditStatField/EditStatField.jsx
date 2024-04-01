import "./EditStatField.scss";

function EditStatField( {fieldName, label, value, error, updateValue} ){

    function onChangeHandler(event){
        const {name, value} = event.target;
        updateValue(name, value);
    }

    return(
        <div className="stat-field">
            <div className="stat-field__input-container">
                <label className="stat-field__label" htmlFor={fieldName}>{label}</label>
                <input className={!error ? "stat-field__text-box" : "stat-field__text-box stat-field__text-box--error"} id={fieldName} name={fieldName} onChange={onChangeHandler} type="number" min="-2" max="99" step="1" value={value} />
            </div>
            <label className="stat-field__error" htmlFor={fieldName}>{error}</label>
        </div>
    );
}

export default EditStatField