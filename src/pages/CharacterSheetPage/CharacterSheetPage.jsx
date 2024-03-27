import './CharacterSheetPage.scss';
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails.jsx';
import CharacterExtras from '../../components/CharacterExtras/CharacterExtras.jsx';
import CharacterSkills from '../../components/CharacterSkills/CharacterSkills.jsx';
import CharacterStats from '../../components/CharacterStats/CharacterStats.jsx';

function CharacterSheetPage() {
    // Get the character id
    const { id } = useParams();

    // State variables for the pages data and loading state
    const [characterSheet, setCharacterSheet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Get the session token
    const token = sessionStorage.getItem("token");

    // Get the data for the charater with the id in the params
    useEffect(() => {
        const populateSheet = async (token, characterId) => {
            try {
                const response = await axios.get(`${BASE_URL}characters/${characterId}`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log(response.data);
                setCharacterSheet(response.data);
                setIsLoading(false);

            } catch (error) {
                console.error(error);
                setCharacterSheet(null);
                setIsLoading(false);
            }
        }

        // Get the data is there is a logged in user
        if(!!token){
            populateSheet(token, id);

        }else{
            setIsLoading(false);
        }

    }, [token, id]);

    // TODO look nicer
    if (isLoading) {
        return <div>Loading...</div>
    }

    // TODO look nicer
    if(!token){
        return <div>You must be logged in to view a character sheet.</div>
    }

    // TODO navigate away?
    if(!characterSheet){
        return <div>No character data found</div>
    }

    return(
        <section className="character-sheet">
            <div className="character-sheet__heading-container">
                <h1 className="character-sheet__heading">{`${characterSheet.character_name}'s Character Sheet`}</h1>
                <ButtonLink btnText={"EDIT"} navTo={`/characters/${id}/edit`} />
            </div>
            <CharacterDetails character={characterSheet} />
            <CharacterStats stats={characterSheet.stats} />
            <CharacterSkills skills={characterSheet.skills} />
            <CharacterExtras character={characterSheet} />
        </section>
    );
}

export default CharacterSheetPage;