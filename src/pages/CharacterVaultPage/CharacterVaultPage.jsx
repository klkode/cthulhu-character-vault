import './CharacterVaultPage.scss';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";
import CharacterVaultTable from '../../components/CharacterVaultTable/CharacterVaultTable.jsx';

function CharacterVaultPage() {

  // State variables for the pages data and loading state
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get the session token
  const token = sessionStorage.getItem("token");

  // Get the list of characters that the logged in user owns
  useEffect(() => {
    const populateVault = async(token) => {
      try{
        const response = await axios.get(`${BASE_URL}characters`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
        setCharacterList(response.data);
        setIsLoading(false);

      }catch(error){
        console.error(error);
        setCharacterList([]);
        setIsLoading(false);
      }
    }

    if(!!token){
      populateVault(token);
    }else{
      setIsLoading(false);
    }
  }, [token]);

  // TODO look nicer
  if (isLoading) {
    return <div>Loading...</div>
  }

  // TODO look nicer
  if(!token){
    return <div>You must be logged in to view your character vault.</div>
  }

  return (
    <section className="character-vault">
      <h1 className="character-vault__heading">Character Vault</h1>
      <input className="character-vault__search" />
      <CharacterVaultTable charactersList={characterList}/>
    </section>
  );
}

export default CharacterVaultPage;