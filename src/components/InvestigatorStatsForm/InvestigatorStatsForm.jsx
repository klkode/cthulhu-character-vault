import { useRef, useState } from 'react';
import './InvestigatorStatsForm.scss';
import CancelButton from '../CancelButton/CancelButton';
import { calcBuild, calcHealth, calcMagicPoints, calcSanity, determineDodgeMin, determineLanguageOwnMin } from '../../utils/calculate-related-values';
import { validateInvestigatorStats } from '../../utils/character-validation';

function InvestigatorStatsForm({ inputValues, updateOne, updateMultiple, previous, next, setDodge, setLanguage }) {

  // Create a state variable for keeping track of error messages
  const defaultErrorState = {
    hasError: false,
    strError: "",
    dexError: "",
    conError: "",
    sizeError: "",
    appError: "",
    eduError: "",
    intError: "",
    powError: "",
    luckError: ""
  }
  const [errorMessages, setErrorMessages] = useState(defaultErrorState);

  // Create useRefs for fields necessary in calculation
  const strRef = useRef();
  const sizeRef = useRef();
  const conRef = useRef();
  const powRef = useRef();

  /**
   * previousClickHandler is a function to handle when the "previous" button is clicked. It uses the function passed down as a props to change the form component displayed to the form before this one in the page's progression. Validation is not required to move backwards.
   * 
   * @param {Object}      event
   * 
   */
  function previousClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    previous();
  }

  /**
   * nextClickHandler is a function to handle when the "next" button is clicked. It uses the function passed down as a props to change the form component displayed to the form after this one in the page's progression, if the inputs are successfully validated. Otherwise it will trigger the display of error messages.
   * 
   * @param {Object}      event
   * 
   */
  function nextClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Validate the page inputs before continuing to next state
    const errors = validateInvestigatorStats(inputValues);

    // If there are error messages show them
    if(errors.hasError){
      setErrorMessages(errors);
    }else{
      // If there are no error messages remove and previous error messages and move on to next form
      setErrorMessages(defaultErrorState);
      next();
    }
  }

  /**
   * onChangeHandler is a function to handle updating the state variable tracking the user's inputs when the input fields have their value changed.
   * 
   * @param {Object}      event
   * 
   */
  function onChangeHandler(event) {
    updateOne(event.target.name, event.target.value);

  }

  /**
   * onSkillEffectChangeHandler is a function to handle updating the state variable tracking the user's inputs when the input fields have their value changed, as well as any associated skill state variable data that is dependent on this stat.
   * 
   * @param {Object}      event
   * 
   */
  function onSkillEffectChangeHandler(event){
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    // The Dexterity Stat affects the base value of the Dodge skill
    if(fieldName === "dexterity"){
      const dodgeBase = determineDodgeMin(parseInt(fieldValue, 10));
      setDodge(dodgeBase);

    }

    // The Education Stat affects the base value of the Language(Own) Skill
    if(fieldName === "education"){
      const languageBase = determineLanguageOwnMin(parseInt(fieldValue, 10));
      setLanguage(languageBase);

    }
    updateOne(event.target.name, event.target.value);

  }

  /**
   * onCalcChangeHandler is a function to handle updating the state variable tracking the user's inputs when the input fields have their value changed, as well as any associated calculated stat value that is dependent on this stat.
   * 
   * @param {Object}      event
   * 
   */
  function onCalcChangeHandler(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const stats = {...inputValues};

    if(fieldName === "power"){
      if(fieldValue !== ""){
        stats.sanity = calcSanity(parseInt(fieldValue, 10));
        stats.magic_points = calcMagicPoints(parseInt(fieldValue, 10));

      }else{
        // the input vaule is invalid/empty so reset the sanity and magic points to placeholders
        stats.sanity = "";
        stats.magic_points = "";

      }

    }else if(fieldName === "strength"){
      const size = sizeRef.current.value;
      if(fieldValue !== "" && size !== ""){
        stats.build = calcBuild(parseInt(fieldValue, 10), parseInt(size, 10));
        
      }else{
        // one of the two required input vaules is invalid/empty so reset the build to placeholder
        stats.build = "";
      }

    }else if(fieldName === "constitution"){
      const size = sizeRef.current.value;
      if(fieldValue !== "" && size !== ""){
        stats.health = calcHealth(parseInt(fieldValue, 10), parseInt(size, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the health to placeholder
        stats.health = "";
      }

    }else if(fieldName === "size"){
      const str = strRef.current.value;
      if(fieldValue !== "" && str !== ""){
        stats.build = calcBuild(parseInt(str, 10), parseInt(fieldValue, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the build to placeholder
        stats.build = "";
      }

      const con = conRef.current.value;
      if(fieldValue !== "" && con !== ""){
        stats.health = calcHealth(parseInt(con, 10), parseInt(fieldValue, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the health to placeholder
        stats.health = "";
      }
    }
    stats[fieldName] = fieldValue;
    // Update the input for the changed fields
    updateMultiple(stats);
  }

  return (
    <form className="stats-form" id="add-stats-form" name="add-stats-form">
      <h2 className="stats-form__heading" >Investigator Statistics</h2>
      {/* <p className="stats-form__instructions" ></p> */}
      {/* TODO Value assignment options (later sprint) */}
      <div className="stats-form__stats-container">
        <fieldset className="stats-form__assigned-container" form="add-stats-form">
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="strength">{"Strength (STR): "}</label>
              <input className={!errorMessages.strError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="strength" name="strength" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.strength} ref={strRef} />
            </div>
            <label className="stats-form__error" htmlFor="strength">{errorMessages.strError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="dexterity">{"Dexterity (DEX): "}</label>
              <input className={!errorMessages.dexError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="dexterity" name="dexterity" onChange={onSkillEffectChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.dexterity}/>
            </div>
            <label className="stats-form__error" htmlFor="dexterity">{errorMessages.dexError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="constitution">{"Constitution (CON): "}</label>
              <input className={!errorMessages.conError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="constitution" name="constitution" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.constitution} ref={conRef} />
            </div>
            <label className="stats-form__error" htmlFor="constitution">{errorMessages.conError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="size">{"Size (SIZE): "}</label>
              <input className={!errorMessages.sizeError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="size" name="size" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.size} ref={sizeRef} />
            </div>
            <label className="stats-form__error" htmlFor="size">{errorMessages.sizeError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="appearance">{"Appearance (APP): "}</label>
              <input className={!errorMessages.appError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="appearance" name="appearance" onChange={onChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.appearance} />
            </div>
            <label className="stats-form__error" htmlFor="appearance">{errorMessages.appError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="intelligence">{"Intelligence (INT): "}</label>
              <input className={!errorMessages.intError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="intelligence" name="intelligence" onChange={onChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.intelligence} />
            </div>
            <label className="stats-form__error" htmlFor="intelligence">{errorMessages.intError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="education">{"Education (EDU): "}</label>
              <input className={!errorMessages.eduError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="education" name="education" onChange={onSkillEffectChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.education} />
            </div>
            <label className="stats-form__error" htmlFor="education">{errorMessages.eduError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="power">{"Power (POW): "}</label>
              <input className={!errorMessages.powError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="power" name="power" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.power} ref={powRef} />
            </div>
            <label className="stats-form__error" htmlFor="power">{errorMessages.powError}</label>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="luck">{"Luck (LUCK): "}</label>
              <input className={!errorMessages.luckError ? "stats-form__text-box": "stats-form__text-box stats-form__text-box--error"} id="luck" name="luck" onChange={onChangeHandler} type="number" min="0" max="99" step="1" placeholder={50} value={inputValues.luck} />
            </div>
            <label className="stats-form__error" htmlFor="luck">{errorMessages.luckError}</label>
          </div>
        </fieldset>
        <fieldset className="stats-form__calculated-container" form="add-stats-form">
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="sanity">{"Sanity (SAN): "}</label>
              <input className="stats-form__text-box stats-form__text-box--read-only" id="sanity" name="sanity" value={inputValues.sanity}  onChange={onChangeHandler} type="number" min="0" max="99" step="1" readOnly={true}  />
            </div>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="health">{"Health (HP): "}</label>
              <input className="stats-form__text-box stats-form__text-box--read-only" id="health" name="health"  onChange={onChangeHandler} type="number" min="0" max="50" step="1" value={inputValues.health} readOnly={true} />
            </div>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="magic_points">{"Magic Points (MP): "}</label>  
              <input className="stats-form__text-box stats-form__text-box--read-only" id="magic_points" name="magic_points" value={inputValues.magic_points} onChange={onChangeHandler} type="number" min="0" max="50" step="1" readOnly={true} />
            </div>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="movement">{"Movement: "}</label>
              <input className="stats-form__text-box stats-form__text-box--read-only" id="movement" name="movement"  onChange={onChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.movement} readOnly={true} />
            </div>
          </div>
          <div className="stats-form__field-container">
            <div className="stats-form__input-container">
              <label className="stats-form__label" htmlFor="build">{"Build: "}</label>
              <input className="stats-form__text-box stats-form__text-box--read-only" id="build" name="build"  onChange={onChangeHandler} type="number" min="-2" max="2" step="1" readOnly={true} value={inputValues.build} />
            </div>
          </div>
          {/* TODO damage bonus (next sprint) */}
        </fieldset>
      </div>
      <div className="stats-form__btn-container">
        <div className="stats-form__nav-btn-container">
          <button className="stats-form__btn" onClick={previousClickHandler}>Previous</button>
          <button className="stats-form__btn" onClick={nextClickHandler}>Next</button>
        </div>
        <div className="stats-form__cancel-container stats-form__cancel-container--mobile"><CancelButton /></div>
      </div>
    </form>
  );
}

export default InvestigatorStatsForm;