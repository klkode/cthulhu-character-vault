import { useState } from 'react';
import './CharacterExtras.scss';

function CharacterExtras({character}) {

  const [selectState, setSelectState] = useState(null);
  const [selectLabel, setSelectLabel] = useState(null);

  function selectionHandler(event){
    const keyName = event.target.value;
    const displayName = keyName.replace("_", " ");
    setSelectState(character[keyName]);
    setSelectLabel(displayName);
  }
    
  return (
    <article className="character-extras">
      <h3 className="character-extras__heading">More Details</h3>
      <div className="character-extras__container">
        <div className="dropdown character-extras__dropdown">
          <button className="btn btn-secondary dropdown-toggle character-extras__option character-extras__option--default" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {!selectLabel ? "Select Detail" : selectLabel }
          </button>
          <ul className="dropdown-menu character-extras__dropdown-menu">
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="special_people" onClick={selectionHandler}>Special People</button>
            </li>
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="favoured_possession" onClick={selectionHandler}>Favoured Posssion</button>
            </li>
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="traits" onClick={selectionHandler}>Traits</button>
            </li>
            {/* TODO more complicated, save for later */}
            {/* <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="equipment" onClick={selectionHandler}>Equipment</button>
            </li> */}
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="injuries" onClick={selectionHandler}>Injuries</button>
            </li>
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="mania" onClick={selectionHandler}>Manias</button>
            </li>
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="spells" onClick={selectionHandler}>Spells</button>
            </li>
            <li className="character-extras__option-container">
              <button className="dropdown-item character-extras__option" type="button" value="notes" onClick={selectionHandler}>Notes</button>
            </li>
          </ul>
        </div>
        <div className="character-extras__value-container">
          {/*TODO so info in nicer way  */}
          <p className="character-extras__value">{selectState}</p>
        </div>
      </div>

    </article>
  );
}

export default CharacterExtras;