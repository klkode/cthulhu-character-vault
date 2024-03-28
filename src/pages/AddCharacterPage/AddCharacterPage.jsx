import './AddCharacterPage.scss';
// import InvestigatorBackgroundForm from '../../components/InvestigatorBackgroundForm/InvestigatorBackgroundForm.jsx';
import InvestigatorDetailsForm from '../../components/InvestigatorDetailsForm/InvestigatorDetailsForm.jsx';
import InvestigatorExtrasForm from '../../components/InvestigatorExtrasForm/InvestigatorExtrasForm.jsx';
import InvestigatorSkillsForm from '../../components/InvestigatorSkillsForm/InvestigatorSkillsForm.jsx';
import InvestigatorStatsForm from '../../components/InvestigatorStatsForm/InvestigatorStatsForm.jsx';
import { useState } from 'react';
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";

function AddCharacterPage() {
    // Get the session token
    const token = sessionStorage.getItem("token");

    // Create state variable for keeping track of the user's progress through adding a character
    const [formState, setFormState] = useState(1);

    function nextForm(){
        setFormState(formState + 1);
    }

    function previousForm(){
        setFormState(formState - 1);
    }

    // Make inital input state for character detail fields
    const initialCharacterState = {
        name: "",
        gender: "",
        age: "",
        birthplace: "",
        residence: "",
        background_id: "",
        special_people: "",
        favoured_possession: "",
        mania: "",
        traits: "",
        injuries: "",
        feats: "",
        spells: "",
        notes: ""
    }

    // Make inital input state for character stats fields
    const initialStatsState = {
        strength: "",
        dexterity: "",
        constitution: "",
        size: "",
        appearance: "",
        intelligence: "",
        education: "",
        power: "",
        build: "",
        health: "",
        movement: 8,
        sanity: "",
        magic_points: "",
        luck: ""
    }

    // Create state variables for recording the user's inputs for their new character's data
    const [characterInputs, setCharacterInputs] = useState(initialCharacterState);
    const [statsInputs, setStatsInputs] = useState(initialStatsState);
    const [skillsInputs, setSkillsInputs] = useState([]);
    const [equipmentInputs, setEquipmentInputs] = useState([]);

    /**
     * updateForm is a wrapper function that helps to set the updated formInputs state variable based on the change of only 1 of its key-value pairs. The field parameter is the key to be updated and the input parameter is the new value.
     * 
     * @param {string}      field
     * @param {string}      input
     * 
     */
    function updateCharacterDetails(field, input){
        const updatedInput = {...characterInputs, [field]: input}
        setCharacterInputs(updatedInput);
    }

    /**
     * updateForm is a wrapper function that helps to set the updated formInputs state variable based on the change of only 1 of its key-value pairs. The field parameter is the key to be updated and the input parameter is the new value.
     * 
     * @param {string}      field
     * @param {string}      input
     * 
     */
    function updateStatsVaules(field, input){
        const updatedInput = {...statsInputs, [field]: input}
        setStatsInputs(updatedInput);
    }

    /**
     * postCharacter is an asynchronous function that takes a validated character object and POSTs it to the server to add to the character database and other relational databases.
     * 
     * @param {Object}      characterObject 
     * @param {string}      token 
     * 
     */
    const postCharacter = async(characterObject, token) =>{
        try{
            const response = await axios.post(`${BASE_URL}characters`, characterObject, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if(!!response.data){
                // TODO success message?
            }

        }catch(error){
            console.log(error);
            // TODO error notification for user?
        }
    };

    function createCharacter(){
        //Create character object to send to the server
        const characterData = characterInputs;
        characterData.stats = statsInputs;
        characterData.skills = skillsInputs;
        characterData.equipment = equipmentInputs;

        // Post character to the server
        postCharacter(characterData, token);

        // TODO notify user? navigate away? clear fields? something?
    }

    // TODO look nicer
    if(!token){
        return <div>You must be logged in to create a new character.</div>
    }
    
    return (
        <section className="add-character">
            <h1 className="add-character__heading">Create a New Character</h1>
            <article className="add-character__form-container">
                {formState === 1 && 
                <InvestigatorDetailsForm 
                    inputValues={characterInputs} updateHandler={updateCharacterDetails} next={nextForm} />
                }
                {formState === 2 && 
                <InvestigatorStatsForm 
                    inputValues={statsInputs} updateHandler={updateStatsVaules} previous={previousForm} next={nextForm} />
                }
                {formState === 3 && 
                <InvestigatorSkillsForm 
                    updateBackground={updateCharacterDetails} updateSkills={setSkillsInputs} previous={previousForm} next={nextForm} />
                }
                {formState === 4 && 
                <InvestigatorExtrasForm 
                    updateHandler={updateCharacterDetails} updateEquipment={setEquipmentInputs} previous={previousForm} verifiedSubmit={createCharacter} />
                }
            </article>
        </section>
    );
    }

export default AddCharacterPage;