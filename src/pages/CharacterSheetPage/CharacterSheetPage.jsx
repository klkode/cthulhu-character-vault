import './CharacterSheetPage.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";
// import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { ReactComponent as EditIcon } from '../../assets/icons/edit-24px.svg';
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
    const [skillsList, setSkillsList] = useState([]);
    const [serverErrMsg, setServerErrMsg] = useState("");

    // Make navigate to got to edit page on button click
    const navigate = useNavigate();

    // Get the session token
    const token = sessionStorage.getItem("token");

    /**
     * getSkills is an asynchronous function that will get a list of all the skills stored in the server.
     * 
     */
    const getSkills = async () => {
        try{
            const skillsresponse = await axios.get(`${BASE_URL}skills`);
            setSkillsList(skillsresponse.data);    
        }catch(error){
            console.error(error);
            setServerErrMsg(error.response.data.error);
        }
    }

    const populateSheet = async (token, characterId) => {
        try {
            const response = await axios.get(`${BASE_URL}characters/${characterId}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            setCharacterSheet(response.data);
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setCharacterSheet(null);
            setIsLoading(false);
            setServerErrMsg(error.response.data.error);
        }
    }
    // Get the data for the charater with the id in the params
    useEffect(() => {
        // Get the data is there is a logged in user
        if(!!token){
            getSkills();
            populateSheet(token, id);

        }else{
            setIsLoading(false);
        }

    }, [token, id]);

    function editClickHandler(event){

        navigate(`/characters/${id}/edit`);
    }

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
                <button className="character-sheet__edit-btn" onClick={editClickHandler}><EditIcon /></button>
            </div>
            <CharacterDetails character={characterSheet} />
            <CharacterStats stats={characterSheet.stats} />
            <CharacterSkills skills={characterSheet.skills} skillDetails={skillsList} />
            <CharacterExtras character={characterSheet} />
        </section>
    );
}

export default CharacterSheetPage;