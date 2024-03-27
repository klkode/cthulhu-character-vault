import { useRef } from 'react';
import './InvestigatorStatsForm.scss';

function InvestigatorStatsForm({ updateHandler, previous, next }) {

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

  function cancelClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TODO navigate back to home or previous page?
  }

  function previousClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    previous();
  }

  function nextClickHandler(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TODO validate the page inputs before continuing to next state

    next();
  }

  // TODO make util file to hold calculations to reference rather than have functions here
  function calcBuild(str, size) {
    // Calculate the sum of strength and size
    const sum = str + size;

    // Calculate the build using the CoC 7e build calculation table values
    let build;
    if(sum <= 64){
      build = -2;
    }else if(sum >= 65 && sum <= 84){
      build = -1;
    }else if(sum >= 85 && sum <= 124){
      build = 0;
    }else if(sum >= 125 && sum <= 164){
      build = 1;
    }else{
      build = 2;
    }

    // Update the textbox and the input field
    buildRef.current.value = build;
    updateHandler("build", build);

  }

  function calcHealth(con, size) {

    const health = Math.floor((con + size) / 10);

    // Update the textbox and the input field
    hpRef.current.value = health;
    updateHandler("health", health);
  }

  function calcMagicPoints(power) {
    // Calculate themagic points using CoC 7e rules, which is 1/5 of POWER
    const mp = Math.floor(power / 5);

    // Update the textbox and the input field
    mpRef.current.value = mp;
    updateHandler("magic_points", mp);
  }

  function calcSanity(power) {
    // No calculation needed as CoC 7e rules is that initial SAN = POW
    // Update the textbox and the input field
    sanRef.current.value = power;
    updateHandler("sanity", power);
  }

  function onChangeHandler(event) {
    updateHandler(event.target.name, event.target.value);
  }

  function onCalcChangeHandler(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    if(fieldName === "power"){
      if(fieldValue !== ""){
        calcSanity(parseInt(fieldValue, 10));
        calcMagicPoints(parseInt(fieldValue, 10));

      }else{
        // the input vaule is invalid/empty so reset the sanity and magic points to placeholders
        updateHandler("sanity", -1);
        updateHandler("magic_points", -1);

      }

    }else if(fieldName === "strength"){
      const size = sizeRef.current.value;
      if(fieldValue !== "" && size !== ""){
        calcBuild(parseInt(fieldValue, 10), parseInt(size, 10));
        
      }else{
        // one of the two required input vaules is invalid/empty so reset the build to placeholder
        updateHandler("build", "");
      }

    }else if(fieldName === "constitution"){
      const size = sizeRef.current.value;
      if(fieldValue !== "" && size !== ""){
        calcHealth(parseInt(fieldValue, 10), parseInt(size, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the health to placeholder
        updateHandler("health", -1);
      }

    }else if(fieldName === "size"){
      const str = strRef.current.value;
      if(fieldValue !== "" && str !== ""){
        calcBuild(parseInt(str, 10), parseInt(fieldValue, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the build to placeholder
        updateHandler("build", "");
      }

      const con = conRef.current.value;
      if(fieldValue !== "" && con !== ""){
        calcHealth(parseInt(con, 10), parseInt(fieldValue, 10));

      }else{
        // one of the two required input vaules is invalid/empty so reset the health to placeholder
        updateHandler("health", -1);
      }
    }

    // Update the input for the changed field
    updateHandler(fieldName, parseInt(fieldValue, 10));
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
              <input className="stats-form__text-box" id="strength" name="strength" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" ref={strRef} />
              <label className="stats-form__error" htmlFor="strength"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="dexterity">{"Dexterity (DEX): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="dexterity" name="dexterity" onChange={onChangeHandler} type="number" min="1" max="99" step="1" />
              <label className="stats-form__error" htmlFor="dexterity"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="constitution">{"Constitution (CON): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="constitution" name="constitution" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" ref={conRef} />
              <label className="stats-form__error" htmlFor="constitution"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="size">{"Size (SIZE): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="size" name="size" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" ref={sizeRef} />
              <label className="stats-form__error" htmlFor="size"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="appearance">{"Appearance (APP): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="appearance" name="appearance" onChange={onChangeHandler} type="number" min="1" max="99" step="1" />
              <label className="stats-form__error" htmlFor="appearance"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="intelligence">{"Intelligence (INT): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="intelligence" name="intelligence" onChange={onChangeHandler} type="number" min="1" max="99" step="1" />
              <label className="stats-form__error" htmlFor="intelligence"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="education">{"Education (EDU): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="education" name="education" onChange={onChangeHandler} type="number" min="1" max="99" step="1" />
              <label className="stats-form__error" htmlFor="education"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="power">{"Power (POW): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="power" name="power" onChange={onCalcChangeHandler} type="number" min="1" max="99" step="1" ref={powRef} />
              <label className="stats-form__error" htmlFor="power"></label>
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="luck">{"Luck (LUCK): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box" id="luck" name="luck" onChange={onChangeHandler} type="number" min="1" max="99" step="1" placeholder={50} />
              <label className="stats-form__error" htmlFor="luck"></label>
            </div>
          </div>
        </fieldset>
        <fieldset className="stats-form__calculated-container" form="add-stats-form">
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="sanity">{"Sanity (SAN): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="sanity" name="sanity" type="number" min="1" max="99" step="1" readOnly={true} ref={sanRef} />
              {/* <label className="stats-form__error" htmlFor="sanity"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="health">{"Health (HP): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="health" name="health" type="number" min="1" max="50" step="1" readOnly={true} ref={hpRef} />
              {/* <label className="stats-form__error" htmlFor="health"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="magic_points">{"Magic Points (MP): "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="magic_points" name="magic_points" type="number" min="1" max="50" step="1" readOnly={true} ref={mpRef} />
              {/* <label className="stats-form__error" htmlFor="magic_points"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="movement">{"Movement: "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="movement" name="movement" type="number" min="1" max="99" step="1" value={8} readOnly={true} />
              {/* <label className="stats-form__error" htmlFor="movement"></label> */}
            </div>
          </div>
          <div className="stats-form__field-container">
            <label className="stats-form__label" htmlFor="build">{"Build: "}</label>
            <div className="stats-form__input-container">
              <input className="stats-form__text-box stats-form__text-box--read-only" id="build" name="build" type="number" min="-2" max="2" step="1" defaultValue={-2} readOnly={true} ref={buildRef} />
              {/* <label className="stats-form__error" htmlFor="build"></label> */}
            </div>
          </div>
          {/* TODO damage bonus */}
        </fieldset>
      </div>
      <div className="stats-form__btn-container">
        <button className="stats-form__btn" onClick={previousClickHandler}>Previous</button>
        <button className="stats-form__btn stats-form__btn--cancel" onClick={cancelClickHandler} >Cancel</button>
        <button className="stats-form__btn" onClick={nextClickHandler}>Next</button>
      </div>
    </form>
  );
}

export default InvestigatorStatsForm;