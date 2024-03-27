import './InvestigatorDetailsForm.scss';

function InvestigatorDetailsForm( {updateHandler, next} ) {
  
  function cancelClickHandler(event){
    // Prevent form from submitting
    event.preventDefault();

    // TODO navigate back to home or previous page?
  }

  function nextClickHandler(event){
    // Prevent form from submitting
    event.preventDefault();

    // TODO validate the page inputs before continuing to next state

    next();
  }

  return (
    <form className="details-form" id="add-details-form" name="add-details-form">
      <h2 className="details-form__heading" >Investigator Details</h2>
      {/* <p className="details-form__instructions" ></p> */}
      <fieldset className="details-form__container" form="add-details-form">
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="name">Name: </label>
          <div className="details-form__input-container">
            <input className="details-form__input" id="name" name="name" onChange={updateHandler} />
            <label className="details-form__error" htmlFor="name"></label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="gender">Gender: </label>
          <div className="details-form__input-container">
            <input className="details-form__input" id="gender" name="gender" onChange={updateHandler} />
            <label className="details-form__error" htmlFor="gender"></label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="age">Age: </label>
          <div className="details-form__input-container">
            <input className="details-form__input" id="age" name="age" onChange={updateHandler} />
            <label className="details-form__error" htmlFor="age"></label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="birthplace">Birthplace: </label>
          <div className="details-form__input-container">
            <input className="details-form__input" id="birthplace" name="birthplace" onChange={updateHandler} />
            <label className="details-form__error" htmlFor="birthplace"></label>
          </div>
        </div>
        <div className="details-form__field-container">
          <label className="details-form__label" htmlFor="residence">Residence: </label>
          <div className="details-form__input-container">
            <input className="details-form__input" id="residence" name="residence" onChange={updateHandler} />
            <label className="details-form__error" htmlFor="residence"></label>
          </div>
        </div>
      </fieldset>
      <div className="details-form__btn-container">
        <button className="details-form__btn details-form__btn--cancel" onClick={cancelClickHandler} >Cancel</button>
        <button className="details-form__btn" onClick={nextClickHandler}>Next</button>
      </div>
    </form>
  );
}

export default InvestigatorDetailsForm;