import { validateInvestigatorExtras } from '../../utils/character-validation';
import CancelButton from '../CancelButton/CancelButton';
import './InvestigatorExtrasForm.scss';

function InvestigatorExtrasForm( {inputValues, updateHandler, previous, verifiedSubmit } ) {

  // function cancelClickHandler(event){
  //   // Prevent form from submitting
  //   event.preventDefault();

  //   // TODO navigate back to home or previous page?
  // }

  function previousClickHandler(event){
    // Prevent form from submitting
    event.preventDefault();

    // TODO validate the page inputs before continuing to next state
    previous();
  }

  function submitHandler(event){
    // Prevent form from submitting
    event.preventDefault();

    // Validate the page inputs before signaling for an axios post request
    const errors = validateInvestigatorExtras(inputValues);
    if(errors.hasError){
      // TODO show errors
    }else{
      verifiedSubmit();
    }
   
  }

  function onChangeHandler(event){
    updateHandler(event.target.name, event.target.value);
  }

  // TODO (likely next sprint): Adding Character Equipment

  return (
    <form className="extras-form" id="add-extras-form" name="add-extras-form">
      <h2 className="extras-form__heading" >Investigator Extra Details</h2>
      {/* <p className="extras-form__instructions" ></p> */}
      <fieldset className="extras-form__container" form="add-extras-form">
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="special_people">{"Important Person(s): "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input extras-form__input--small" id="special_people" name="special_people" onChange={onChangeHandler} value={inputValues.special_people} rows="2" />
            <label className="extras-form__error" htmlFor="special_people"></label>
          </div>
        </div>
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="favoured_possession">{"Favourite Possession: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input extras-form__input--small" id="favoured_possession" name="favoured_possession" onChange={onChangeHandler} value={inputValues.favoured_possession} rows="2"/>
            <label className="extras-form__error" htmlFor="favoured_possession"></label>
          </div>
        </div>
        {/* TODO EQUIPMENT */}
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="traits">{"Description: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input" id="traits" name="traits" onChange={onChangeHandler} value={inputValues.traits} rows="4"/>
            <label className="extras-form__error" htmlFor="traits"></label>
          </div>
        </div>
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="feats">{"Feats: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input" id="feats" name="feats" onChange={onChangeHandler} value={inputValues.feats} rows="4"/>
            <label className="extras-form__error" htmlFor="feats"></label>
          </div>
        </div>
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="mania">{"Manias: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input" id="mania" name="mania" onChange={onChangeHandler} value={inputValues.mania} rows="4"/>
            <label className="extras-form__error" htmlFor="mania"></label>
          </div>
        </div>
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="injuries">{"Injuries: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input" id="injuries" name="injuries" onChange={onChangeHandler} value={inputValues.injuries} rows="4"/>
            <label className="extras-form__error" htmlFor="injuries"></label>
          </div>
        </div>
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="spells">{"Spells: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input" id="spells" name="spells" onChange={onChangeHandler} value={inputValues.spells} rows="4"/>
            <label className="extras-form__error" htmlFor="spells"></label>
          </div>
        </div>
        <div className="extras-form__field-container">
          <label className="extras-form__label" htmlFor="notes">{"Notes: "}</label>
          <div className="extras-form__input-container">
            <textarea className="extras-form__input" id="notes" name="notes" onChange={onChangeHandler} value={inputValues.notes} rows="4"/>
            <label className="extras-form__error" htmlFor="notes"></label>
          </div>
        </div>
      </fieldset>
      <div className="extras-form__btn-container">
        <button className="extras-form__btn" onClick={previousClickHandler}>Previous</button>
        {/* <button className="extras-form__btn extras-form__btn--cancel" onClick={cancelClickHandler} >Cancel</button> */}
        <CancelButton />
        <button className="extras-form__btn extras-form__btn--submit" onClick={submitHandler}>Create</button>
      </div>
    </form>
  );
}

export default InvestigatorExtrasForm;