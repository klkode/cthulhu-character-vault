import { useState } from 'react';
import { validateInvestigatorDetails } from '../../utils/character-validation';
import CancelButton from '../CancelButton/CancelButton';
import './InvestigatorDetailsForm.scss';

function InvestigatorDetailsForm( {inputValues, updateHandler, next} ) {
  const defaultErrorMessages = {
    hasError: false,
    nameError: "",
    ageError: "",
    genderError: "",
    birthplaceError: "",
    residenceError: ""
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
  
  /**
   * nextClickHandler is a function to handle when the "next" button is clicked. It uses the function passed down as a props to change the form component displayed, if the inputs are successfully validated. Otherwise it will trigger the display of error messages.
   * 
   * @param {Object}      event
   * 
   */
  function nextClickHandler(event){
    // Prevent form from submitting
    event.preventDefault();

    // Validate the page inputs before continuing to next state
    const errors = validateInvestigatorDetails(inputValues);

    // If there are errors display them
    if(errors.hasError){
      setErrorMessages(errors);

    }else{
      //If there are no errors, clear any previous error messages and proceed to next state 
      setErrorMessages(defaultErrorMessages);
      next();
    }

  }

  /**
   * onChangeHandler is a function to handle updating the state variable tracking the user's inputs when the input fields have their value changed.
   * 
   * @param {Object}      event
   * 
   */
  function onChangeHandler(event){
    updateHandler(event.target.name, event.target.value);
  }

  return (
    <form className="details-form" id="add-details-form" name="add-details-form">
      <h2 className="details-form__heading" >Investigator Details</h2>
      {/* <p className="details-form__instructions" ></p> */}
      <fieldset className="details-form__container" form="add-details-form">
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="name">Name: </label>
          <div className="details-form__input-container">
            <input className={!errorMessages.nameError ? "details-form__input" : "details-form__input details-form__input--error"} id="name" name="name" onChange={onChangeHandler} type="text" value={inputValues.name}/>
            <label className="details-form__error" htmlFor="name">{errorMessages.nameError}</label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="gender">Gender: </label>
          <div className="details-form__input-container">
            <input className={!errorMessages.genderError ? "details-form__input" : "details-form__input details-form__input--error"} id="gender" name="gender" onChange={onChangeHandler} type="text" value={inputValues.gender}/>
            <label className="details-form__error" htmlFor="gender">{errorMessages.genderError}</label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="age">Age: </label>
          <div className="details-form__input-container">
            <input className={!errorMessages.ageError ? "details-form__input" : "details-form__input details-form__input--error"} id="age" name="age" onChange={onChangeHandler} type="text" value={inputValues.age}/>
            <label className="details-form__error" htmlFor="age">{errorMessages.ageError}</label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="birthplace">Birthplace: </label>
          <div className="details-form__input-container">
            <input className={!errorMessages.birthplaceError ? "details-form__input" : "details-form__input details-form__input--error"} id="birthplace" name="birthplace" onChange={onChangeHandler} type="text" value={inputValues.birthplace}/>
            <label className="details-form__error" htmlFor="birthplace">{errorMessages.birthplaceError}</label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="residence">Residence: </label>
          <div className="details-form__input-container">
            <input className={!errorMessages.residenceError ? "details-form__input" : "details-form__input details-form__input--error"} id="residence" name="residence" onChange={onChangeHandler} type="text" value={inputValues.residence}/>
            <label className="details-form__error" htmlFor="residence">{errorMessages.residenceError}</label>
          </div>
        </div>
      </fieldset>
      <div className="details-form__btn-container">
        <CancelButton />
        <button className="details-form__btn" onClick={nextClickHandler}>Next</button>
      </div>
    </form>
  );
}

export default InvestigatorDetailsForm;