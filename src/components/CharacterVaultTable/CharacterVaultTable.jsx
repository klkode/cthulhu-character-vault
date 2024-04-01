import CharacterVaultRow from '../ChararcterVaultRow/CharacterVaultRow';
import './CharacterVaultTable.scss';

function CharacterVaultTable({charactersList, setCharacterList}) {
    
  return (
    <article className="vault-table">
        <div className="vault-table__headings-container">
            <div className="vault-table__name-container">
                <h3 className="vault-table__heading">Character</h3>
            </div>
            <div className="vault-table__background-container">
                <h3 className="vault-table__heading">Background</h3>
            </div>
            <div className="vault-table__actions-container"></div>
        </div>
        <div className="vault-table__rows-container">
        {charactersList.length === 0
            ? <div className="vault-table__no-results">Currently no characters in this vault</div> //TODO make nicer
            : charactersList.map((character) => {
                return <CharacterVaultRow key={character.character_id} id={character.character_id} name={character.character_name} background={character.background_name} setCharacterList={setCharacterList} />
            })}
        </div>
    </article>
  );
}

export default CharacterVaultTable;