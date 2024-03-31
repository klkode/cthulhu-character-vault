import './AddCharacterPage.scss';
import InvestigatorDetailsForm from '../../components/InvestigatorDetailsForm/InvestigatorDetailsForm.jsx';
import InvestigatorExtrasForm from '../../components/InvestigatorExtrasForm/InvestigatorExtrasForm.jsx';
import InvestigatorSkillsForm from '../../components/InvestigatorSkillsForm/InvestigatorSkillsForm.jsx';
import InvestigatorStatsForm from '../../components/InvestigatorStatsForm/InvestigatorStatsForm.jsx';
import { useState, useEffect } from 'react';
import { BASE_URL, CREDIT_SKILL_ID, DEFAULT_MOVEMENT_SCORE, DODGE_SKILL_ID, LANGUAGE_OWN_SKILL_ID } from "../../constant-variables.js"
import axios from "axios";
import { createCharacterToPost } from '../../utils/create-character.js';
import { useNavigate } from 'react-router-dom';

function AddCharacterPage() {
    // Get the session token
    const token = sessionStorage.getItem("token");

    // Make navigate for handling leaving the page
    const navigate = useNavigate();

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
        notes: "", 
        equipment: []
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
        movement: DEFAULT_MOVEMENT_SCORE,
        sanity: "",
        magic_points: "",
        luck: ""
    }

    const emptySkill = {
        skill_id: "",
        name: "",
        base_value: "",
        points: ""
    }

    // Make inital input state for character stats fields
    const initialSkillsState = {
        occupationalSkills: [
            emptySkill, emptySkill, emptySkill, emptySkill, emptySkill, emptySkill, emptySkill, emptySkill
        ],
        personalSkills: [{
            skill_id: CREDIT_SKILL_ID,
            name: "Credit Rating",
            base_value: "",
            points: ""
        }, ]
    }

    // Create state variable for keeping track of the user's progress through adding a character
    const [formState, setFormState] = useState(1);

    // Create state variables for game details from the server
    const [backgroundList, setBackgroundList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);

    // Create state variables for recording the user's inputs for their new character's data
    const [characterInputs, setCharacterInputs] = useState(initialCharacterState);
    const [statsInputs, setStatsInputs] = useState(initialStatsState);
    const [skillsInputs, setSkillsInputs] = useState(initialSkillsState);


    useEffect(() => {
        getBackgrounds();
        getSkills();

    }, []);

    function nextForm(){
        // Include safeguard that the state does not go beyond the number of forms
        if(formState < 4){
            setFormState(formState + 1);
        }
    }

    function previousForm(){
        // Include safeguard that the state does not go under the first index
        if(formState > 1){
            setFormState(formState - 1);
        }  
    }

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

    
    function updateDodgeBase(value){
        const dodgeIndex = skillsList.findIndex((skill) => skill.skill_id === DODGE_SKILL_ID);
        const updateSkills = [...skillsList];
        updateSkills[dodgeIndex].base_value = value;
        updateSkillInputsById(DODGE_SKILL_ID, value);
        setSkillsList(updateSkills);
    }

    function updateLanguageOwnBase(value){
        const languageIndex = skillsList.findIndex((skill) => skill.skill_id === LANGUAGE_OWN_SKILL_ID);
        const updateSkills = [...skillsList];
        updateSkills[languageIndex].base_value = value;
        updateSkillInputsById(LANGUAGE_OWN_SKILL_ID, value);
        setSkillsList(updateSkills);
    }

    function updateSkillInputsById(id, value){
        const occupationIndex = skillsInputs.occupationalSkills.findIndex((skill) => skill.skill_id === id);
        const occupationSkills = [...skillsInputs.occupationalSkills];
        if(occupationIndex !== -1){
            occupationSkills[occupationIndex].base_value = value;
            occupationSkills[occupationIndex].points = value;
        }

        const personalIndex = skillsInputs.personalSkills.findIndex((skill) => skill.skill_id === id);
        const personalSkills = [...skillsInputs.personalSkills];

        if(personalIndex !== -1){
            personalSkills[personalIndex].base_value = value;
            personalSkills[personalIndex].points = value;
        }
        if(occupationIndex !== -1 || personalIndex !== -1){
            const adjustedSkills = {
                occupationalSkills: occupationSkills,
                personalSkills: personalSkills
            }
            setSkillsInputs(adjustedSkills);
        }
    }

    const getSkills = async () => {
        try{
            const skillsresponse = await axios.get(`${BASE_URL}skills`);
            setSkillsList(skillsresponse.data);    
        }catch(error){
            console.error(error);
            // TODO: Do something about this?
        }
    }

    const getBackgrounds = async () => {
        try{
            const backgroundsResponse = await axios.get(`${BASE_URL}backgrounds`);   
            setBackgroundList(backgroundsResponse.data);
        }catch(error){
            console.error(error);
            // TODO: Do something about this?
        }
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
                navigate("/characters");
            }

        }catch(error){
            console.log(error);
            // TODO error notification for user?
        }
    };

    function createCharacter(){
        //Create character object to send to the server
        const characterData = createCharacterToPost(characterInputs, statsInputs, skillsInputs, skillsList);

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
                    inputValues={statsInputs} updateOne={updateStatsVaules} updateMultiple={setStatsInputs} previous={previousForm} next={nextForm} setDodge={updateDodgeBase} setLanguage={updateLanguageOwnBase}/>
                }
                {formState === 3 && 
                <InvestigatorSkillsForm 
                    backgroundValue={characterInputs.background_id} inputValues={skillsInputs} updateBackground={updateCharacterDetails} updateSkills={setSkillsInputs} previous={previousForm} next={nextForm} skillsList={skillsList} backgroundList={backgroundList} />
                }
                {formState === 4 && 
                <InvestigatorExtrasForm 
                    inputValues={characterInputs} updateHandler={updateCharacterDetails} previous={previousForm} verifiedSubmit={createCharacter} submitText={"Create"}/>
                }
            </article>
        </section>
    );
}

export default AddCharacterPage;