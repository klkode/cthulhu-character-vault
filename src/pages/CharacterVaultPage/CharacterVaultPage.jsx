import './CharacterVaultPage.scss';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";

function CharacterVaultPage() {

  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = sessionStorage.getItem("token");

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
      <h1>Character Vault</h1>
      <input className="character-vault__search" />

    </section>
  );
}

export default CharacterVaultPage;