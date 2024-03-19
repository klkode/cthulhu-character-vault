import './CharacterSheetPage.scss';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails.jsx';
import CharacterExtras from '../../components/CharacterExtras/CharacterExtras.jsx';
import CharacterSkills from '../../components/CharacterSkills/CharacterSkills.jsx';
import CharacterStats from '../../components/CharacterStats/CharacterStats.jsx';

function CharacterSheetPage() {
    
    return (
        <section>
            <div>Character Sheet Page</div>
            <CharacterDetails />
            <CharacterExtras />
            <CharacterSkills />
            <CharacterStats />
        </section>
      
    );
}

export default CharacterSheetPage;