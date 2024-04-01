import "./EditStatsForm.scss";
import EditStatField from "../EditStatField/EditStatField";
import CancelButton from "../CancelButton/CancelButton";
import { useState } from "react";
import { validateUpdatedStats } from "../../utils/character-validation";

function EditStatsForm( {inputValues, updateInput, previous, next} ){
    
    // Create state variable to track error messages
    const noErrors = {
        hasError: false,
        strengthErr: "",
        dexterityErr: "",
        constitutionErr: "",
        sizeErr: "",
        appearanceErr: "",
        educationErr: "",
        intelligenceErr: "",
        powerErr: "",
        luckErr: "",

        sanityErr: "",
        magicPointsErr: "",
        healthErr: "",
        movementErr: "",
        buildErr: ""
    }
    const [errMessages, setErrMessages] = useState(noErrors);

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
        const errors = validateUpdatedStats(inputValues);
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
        const errors = validateUpdatedStats(inputValues);
        if(errors.hasError){
            // Show error messages
            setErrMessages(errors);

        }else{
            // Set error messages back to default and go to next state
            setErrMessages(noErrors);
            next();
        }

    }

    return (
        <form className="edit-stats-form" id="edit-stats-form" name="edit-stats-form">
            <h2 className="edit-stats-form__heading" >Investigator Statistics</h2>
            {/* <p className="stats-form__instructions" ></p> */}
            <div className="edit-stats-form__stats-container">
                <fieldset className="edit-stats-form__rolled-container">
                    <EditStatField fieldName={"strength"} label={"Strength (STR): "} value={inputValues.strength} error={errMessages.strengthErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"dexterity"} label={"Dexterity (DEX): "} value={inputValues.dexterity} error={errMessages.dexterityErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"constitution"} label={"Constitution (CON): "} value={inputValues.constitution} error={errMessages.constitutionErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"size"} label={"Size (SIZE): "} value={inputValues.size} error={errMessages.sizeErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"appearance"} label={"Appearance (APP): "} value={inputValues.appearance} error={errMessages.appearanceErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"intelligence"} label={"Intelligence (INT): "} value={inputValues.intelligence} error={errMessages.intelligenceErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"education"} label={"Education (EDU): "} value={inputValues.education} error={errMessages.educationErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"power"} label={"Power (POW): "} value={inputValues.power} error={errMessages.powerErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"luck"} label={"Luck (LUCK): "} value={inputValues.luck} error={errMessages.luckErr} updateValue={updateInput}/>
                </fieldset>
                <fieldset className="edit-stats-form__calculated-container">
                    <EditStatField fieldName={"sanity"} label={"Sanity (SAN): "} value={inputValues.sanity} error={errMessages.sanityErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"health"} label={"Health (HP): "} value={inputValues.health} error={errMessages.healthErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"magic_points"} label={"Magic Points (MP): "} value={inputValues.magic_points} error={errMessages.magicPointsErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"movement"} label={"Movement (MOVE): "} value={inputValues.movement} error={errMessages.movementErr} updateValue={updateInput}/>
                    <EditStatField fieldName={"build"} label={"Build: "} value={inputValues.build} error={errMessages.buildErr} updateValue={updateInput}/>
                </fieldset>
            </div>
            <div className="edit-stats-form__btn-container">
                <button className="edit-stats-form__btn" onClick={previousClickHandler}>Previous</button>
                <CancelButton />
                <button className="edit-stats-form__btn" onClick={nextClickHandler}>Next</button>
            </div>
        </form>
    );
}

export default EditStatsForm;