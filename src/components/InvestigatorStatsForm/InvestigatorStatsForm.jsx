import { useRef } from 'react';
import './InvestigatorStatsForm.scss';
import CancelButton from '../CancelButton/CancelButton';
import { calcBuild, calcHealth, calcMagicPoints, calcSanity, determineDodgeMin, determineLanguageOwnMin } from '../../utils/calculate-related-values';
import { validateInvestigatorStats } from '../../utils/character-validation';

function InvestigatorStatsForm({ inputValues, updateOne, updateMultiple, previous, next, setDodge, setLanguage }) {

  // Create useRefs for fields necessary in calculation
  const strRef = useRef();
  const sizeRef = useRef();
  const conRef = useRef();
  const powRef = useRef();

  // Create useRefs for fields that have values dependent on calculations on other stats
  const sanRef = useRef();
  const hpRef = useRef();
  const mpRef = useRef();
  const buildRef = useRef();

  // function cancelClickHandler(event) {
  //   // Prevent form from submitting
  //   event.preventDefault();

  //   // TODO navigate back to home or previous page?
  // }

  function previousClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    previous();
  }

  function nextClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Validate the page inputs before continuing to next state
    const errors = validateInvestigatorStats(inputValues);
    if(errors.hasError){
      // TODO show error messages
    }else{
      next();
    }
  }

  // // TODO make util file to hold calculations to reference rather than have functions here
  // function calcBuild(str, size) {
  //   // Calculate the sum of strength and size
  //   const sum = str + size;

  //   // Calculate the build using the CoC 7e build calculation table values
  //   let build;
  //   if(sum <= 64){
  //     build = -2;
  //   }else if(sum >= 65 && sum <= 84){
  //     build = -1;
  //   }else if(sum >= 85 && sum <= 124){
  //     build = 0;
  //   }else if(sum >= 125 && sum <= 164){
  //     build = 1;
  //   }else{
  //     build = 2;
  //   }

  //   // Update the textbox and the input field
  //   buildRef.current.value = build;
  //   return build;
  //   // updateOne("build", build);

  // }

  // function calcHealth(con, size) {

  //   const health = Math.floor((con + size) / 10);

  //   // console.log(`health: ${health}`);
  //   // Update the textbox and the input field
  //   hpRef.current.value = health;
  //   return health;
  //   // updateOne("health", health);
  // }

  // function calcMagicPoints(power) {
  //   // Calculate themagic points using CoC 7e rules, which is 1/5 of POWER
  //   const mp = Math.floor(power / 5);

  //   // Update the textbox and the input field
  //   mpRef.current.value = mp;
  //   return mp;
  //   // updateOne("magic_points", mp);
  // }

  // function calcSanity(power) {
  //   // No calculation needed as CoC 7e rules is that initial SAN = POW
  //   // Update the textbox and the input field
  //   sanRef.current.value = power;
  //   return power;
  //   // updateOne("sanity", power);
  // }

  function onChangeHandler(event) {
    // console.log(`key:${event.target.name}`);
    // console.log(`value:${event.target.value}`);
    // console.log(`number:${parseInt(event.target.value, 10)}`);
    updateOne(event.target.name, event.target.value);

  }

  function onSkillEffectChangeHandler(event){
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if(fieldName === "dexterity"){
      const dodgeBase = determineDodgeMin(parseInt(fieldValue, 10));
      setDodge(dodgeBase);
    }
    if(fieldName === "education"){
      const languageBase = determineLanguageOwnMin(parseInt(fieldValue, 10));
      setLanguage(languageBase);
    }
    updateOne(event.target.name, event.target.value);
  }

  function onCalcChangeHandler(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    // console.log(`key:${fieldName}`);
    // console.log(`value:${fieldValue}`);
    // console.log(`number:${parseInt(fieldValue, 10)}`);

    const stats = {...inputValues};

    if(fieldName === "power"){
      if(fieldValue !== ""){
        stats.sanity = calcSanity(parseInt(fieldValue, 10));
        stats.magic_points = calcMagicPoints(parseInt(fieldValue, 10));

      }else{
        // the input vaule is invalid/empty so reset the sanity and magic points to placeholders
        // updateOne("sanity", "");
        // updateOne("magic_points", "");
        stats.sanity = "";
        stats.magic_points = "";

      }

    }else if(fieldName === "strength"){
      const size = sizeRef.current.value;
      if(fieldValue !== "" && size !== ""){
        stats.build = calcBuild(parseInt(fieldValue, 10), parseInt(size, 10));
        
      }else{
        // one of the two required input vaules is invalid/empty so reset the build to placeholder
        // updateOne("build", "");
        stats.build = "";
      }

    }else if(fieldName === "constitution"){
      const size = sizeRef.current.value;
      if(fieldValue !== "" && size !== ""){
        stats.health = calcHealth(parseInt(fieldValue, 10), parseInt(size, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the health to placeholder
        // updateOne("health", "");
        stats.health = "";
      }

    }else if(fieldName === "size"){
      const str = strRef.current.value;
      if(fieldValue !== "" && str !== ""){
        stats.build = calcBuild(parseInt(str, 10), parseInt(fieldValue, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the build to placeholder
        // updateOne("build", "");
        stats.build = "";
      }

      const con = conRef.current.value;
      if(fieldValue !== "" && con !== ""){
        stats.health = calcHealth(parseInt(con, 10), parseInt(fieldValue, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the health to placeholder
        // updateOne("health", "");
        stats.health = "";
      }
    }
    stats[fieldName] = fieldValue;
    // Update the input for the changed field
    // updateOne(fieldName, fieldValue);
    updateMultiple(stats);
  }

  return (
    <form className="stats-form" id="add-stats-form" name="add-stats-form">
      <h2 className="stats-form__heading" >Investigator Statistics</h2>
      {/* <p className="stats-form__instructions" ></p> */}
      {/* TODO Value assignment options */}
      <div className="stats-form__stats-container">
        <fieldset className="stats-form__assigned-container" form="add-stats-form">
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="strength">{"Strength (STR): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="strength" name="strength" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.strength} ref={strRef} />
              <label className="stats-form__error" htmlFor="strength"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="dexterity">{"Dexterity (DEX): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="dexterity" name="dexterity" onChange={onSkillEffectChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.dexterity}/>
              <label className="stats-form__error" htmlFor="dexterity"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="constitution">{"Constitution (CON): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="constitution" name="constitution" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.constitution} ref={conRef} />
              <label className="stats-form__error" htmlFor="constitution"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="size">{"Size (SIZE): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="size" name="size" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.size} ref={sizeRef} />
              <label className="stats-form__error" htmlFor="size"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="appearance">{"Appearance (APP): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="appearance" name="appearance" onChange={onChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.appearance} />
              <label className="stats-form__error" htmlFor="appearance"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="intelligence">{"Intelligence (INT): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="intelligence" name="intelligence" onChange={onChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.intelligence} />
              <label className="stats-form__error" htmlFor="intelligence"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="education">{"Education (EDU): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="education" name="education" onChange={onSkillEffectChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.education} />
              <label className="stats-form__error" htmlFor="education"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="power">{"Power (POW): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="power" name="power" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.power} ref={powRef} />
              <label className="stats-form__error" htmlFor="power"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="luck">{"Luck (LUCK): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="luck" name="luck" onChange={onChangeHandler} type="number" min="0" max="99" step="1" placeholder={50} value={inputValues.luck} />
              <label className="stats-form__error" htmlFor="luck"></label>
            </div>
          </div>
        </fieldset>
        <fieldset className="stats-form__calculated-container" form="add-stats-form">
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="sanity">{"Sanity (SAN): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="sanity" name="sanity" value={inputValues.sanity}  onChange={onChangeHandler} type="number" min="0" max="99" step="1" readOnly={true} ref={sanRef} />
              {/* <label className="stats-form__error" htmlFor="sanity"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="health">{"Health (HP): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="health" name="health"  onChange={onChangeHandler} type="number" min="1" max="50" step="1" value={inputValues.health} readOnly={true} ref={hpRef} />
              {/* <label className="stats-form__error" htmlFor="health"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="magic_points">{"Magic Points (MP): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="magic_points" name="magic_points" value={inputValues.magic_points} onChange={onChangeHandler} type="number" min="1" max="50" step="1" readOnly={true} ref={mpRef} />
              {/* <label className="stats-form__error" htmlFor="magic_points"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="movement">{"Movement: "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="movement" name="movement"  onChange={onChangeHandler} type="number" min="1" max="99" step="1" value={inputValues.movement} readOnly={true} />
              {/* <label className="stats-form__error" htmlFor="movement"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="build">{"Build: "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="build" name="build"  onChange={onChangeHandler} type="number" min="-2" max="2" step="1" readOnly={true} value={inputValues.build} ref={buildRef} />
              {/* <label className="stats-form__error" htmlFor="build"></label> */}
            </div>
          </div>
          {/* TODO damage bonus */}
        </fieldset>
      </div>
      <div className="stats-form__btn-container">
        <button className="stats-form__btn" onClick={previousClickHandler}>Previous</button>
        {/* <button className="stats-form__btn stats-form__btn--cancel" onClick={cancelClickHandler} >Cancel</button> */}
        <CancelButton />
        <button className="stats-form__btn" onClick={nextClickHandler}>Next</button>
      </div>
    </form>
  );
}

export default InvestigatorStatsForm;