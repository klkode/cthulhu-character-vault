import './CharacterDetails.scss';

function CharacterDetails({character}) {
  
  // TODO get background name
  // TODO span for labels?
  return (
    <article className="character-details">
      <div className="character-details__container">
        <h2 className="character-details__name">{`Name: ${character.character_name}`}</h2>
        <h3 className="character-details__background">{`Background: ${character.background_id}`}</h3> 
      </div>
      <div className="character-details__container">
        <div className="character-details__sub-container">
          <p className="character-details__detail-text">{`Age: ${character.age}`}</p>
          <p className="character-details__detail-text">{`Gender: ${character.gender}`}</p>
        </div>
        <div className="character-details__sub-container">
          <p className="character-details__detail-text">{`Birthplace: ${character.birthplace}`}</p>
          <p className="character-details__detail-text">{`Residence: ${character.residence}`}</p>
        </div>
      </div>
    </article>
  );
}

export default CharacterDetails;