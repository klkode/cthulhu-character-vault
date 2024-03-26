import './CharacterStats.scss';

function CharacterStats({stats}) {

    
  return (
    <article className="character-stats">
      <h3 className="character-stats__heading">Stats</h3>
      <div className="character-stats__container character-stats__container--primary-stats">
        <div className="character-stats__rolled-grouping">
          <p className="character-stats__stat">{`STR: ${stats.strength}`}</p>
          <p className="character-stats__stat">{`DEX: ${stats.dexterity}`}</p>
          <p className="character-stats__stat">{`CON: ${stats.constitution}`}</p>
        </div>
        <div className="character-stats__rolled-grouping">
          <p className="character-stats__stat">{`SIZE: ${stats.size}`}</p>
          <p className="character-stats__stat">{`APP: ${stats.appearance}`}</p>
          <p className="character-stats__stat">{`INT: ${stats.intelligence}`}</p>
        </div>
        <div className="character-stats__rolled-grouping">
          <p className="character-stats__stat">{`EDU: ${stats.education}`}</p>
          <p className="character-stats__stat">{`POW: ${stats.power}`}</p>
          <p className="character-stats__stat">{`LUCK: ${stats.luck}`}</p>
        </div>
      </div>
      <div className="character-stats__container">
        <div className="character-stats__calculated-grouping">
          <p className="character-stats__stat">{`Health: ${stats.health}`}</p>
          <p className="character-stats__stat">{`Major Wound Threshold: ${Math.floor(stats.health/2)}`}</p>
        </div>
        <div className="character-stats__calculated-grouping">
          <p className="character-stats__stat">{`Sanity: ${stats.sanity}`}</p>
          <p className="character-stats__stat">{`Indefinite Insanity Threshold: ${Math.floor(stats.sanity/5)}`}</p>
        </div>
        <div className="character-stats__calculated-grouping">
          <p className="character-stats__stat">{`Magic Points: ${stats.magic_points}`}</p>
          <p className="character-stats__stat">{`Movement: ${stats.movement}`}</p>
        </div>
      </div>
    </article>
  );
}

export default CharacterStats;