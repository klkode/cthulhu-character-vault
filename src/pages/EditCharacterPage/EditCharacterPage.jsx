import './EditCharacterPage.scss';
import InvestigatorDetailsForm from '../../components/InvestigatorDetailsForm/InvestigatorDetailsForm.jsx';
import InvestigatorExtrasForm from '../../components/InvestigatorExtrasForm/InvestigatorExtrasForm.jsx';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";
import { createCharacterToPost } from '../../utils/create-character.js';
import { useNavigate, useParams } from 'react-router-dom';
import EditStatsForm from '../../components/EditStatsForm/EditStatsForm.jsx';
import EditSkillsForm from '../../components/EditSkillsForm/EditSkillsForm.jsx';

function EditCharacterPage() {
    // Get the session token
    const token = sessionStorage.getItem("token");

    // Make navigate for handling leaving the page
    const navigate = useNavigate();

    // Get the character id
    const { id } = useParams();

    // Create state variable for keeping track of the user's progress through adding a character
    const [formState, setFormState] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Create state variables for game details from the server
    const [backgroundList, setBackgroundList] = useState([]);
    const [skillsList, setSkillsList] = useState([]);

    // Create state variables for recording the user's inputs for their new character's data
    const [characterInputs, setCharacterInputs] = useState(null);
    const [statsInputs, setStatsInputs] = useState(null);
    const [skillsInputs, setSkillsInputs] = useState(null);


    useEffect(() => {
        // Grab the data for filling out the form drop downs
        getBackgrounds();
        getSkills();

        // Get the data for the character if there is a logged in user
        if(!!token){
          populateCharacterData(token, id);

        }else{
            setIsLoading(false);
        }
    }, [id, token]);

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

    function updateSkillInputsById(id, value){
        const index = skillsInputs.findIndex((skill) => skill.skill_id === id);
        const skills = [...skillsInputs];
        skills[index].points = value;
        setSkillsInputs(skills);
    }

    const getSkills = async () => {
        try{
            const skillsResponse = await axios.get(`${BASE_URL}skills`);
            setSkillsList(skillsResponse.data);    
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
    const updateCharacter = async(characterObject, id, token) =>{
        try{
            console.log("post", characterObject);
            const response = await axios.put(`${BASE_URL}characters/${id}`, characterObject, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            if(!!response.data){
                // TODO success message?
                // TODO return to previous page, either vault or sheet
                navigate(`/characters/${id}`);
            }

        }catch(error){
            console.log(error);
            // TODO error notification for user?
        }
    };

    function editCharacter(){
        //Create character object to send to the server
        const characterData = createCharacterToPost(characterInputs, statsInputs, skillsInputs, skillsList);

        // Post character to the server
        updateCharacter(characterData, id, token);

        // TODO notify user? navigate away? clear fields? something?
    }

    const populateCharacterData = async (token, characterId) => {
      try {
          const response = await axios.get(`${BASE_URL}characters/${characterId}`, {
              headers: {
                  Authorization: "Bearer " + token,
              },
          });
          const characterDetails = response.data;
          setSkillsInputs(characterDetails.skills);
          setStatsInputs(characterDetails.stats);
          
          characterDetails.name = characterDetails.character_name;
          delete characterDetails.character_name;
          delete characterDetails.background_name;
          delete characterDetails.skills;
          delete characterDetails.stats;
          setCharacterInputs(characterDetails);
          setIsLoading(false);

      } catch (error) {
          console.error(error);
          setCharacterInputs(null);
          setStatsInputs(null);
          setSkillsInputs(null);
          setIsLoading(false);
      }
    }

    // TODO look nicer
    if (isLoading) {
      return <div>Loading...</div>
    }

    // TODO navigate away?
    if(!characterInputs){
      return <div>No character data found</div>
    }

    // TODO look nicer
    if(!token){
        return <div>You must be logged in to edit a character.</div>
    }
    
    return (
        <section className="edit-character">
            <h1 className="edit-character__heading">Update Character</h1>
            <article className="edit-character__form-container">
                {formState === 1 && 
                <InvestigatorDetailsForm 
                    inputValues={characterInputs} updateHandler={updateCharacterDetails} next={nextForm} />
                }
                {formState === 2 &&
                  <EditStatsForm 
                    inputValues={statsInputs} updateInput={updateStatsVaules} previous={previousForm} next={nextForm}/>
                }
                {formState === 3 &&
                  <EditSkillsForm 
                    backgroundId={characterInputs.background_id} backgrounds={backgroundList} updateBackground={updateCharacterDetails} skillInputs={skillsInputs} skills={skillsList} updateSkill={updateSkillInputsById} previous={previousForm} next={nextForm} />
                }
                {formState === 4 && 
                <InvestigatorExtrasForm 
                    inputValues={characterInputs} updateHandler={updateCharacterDetails} previous={previousForm} verifiedSubmit={editCharacter} submitText={"Save"} />
                }
            </article>
        </section>
    );
}

export default EditCharacterPage;