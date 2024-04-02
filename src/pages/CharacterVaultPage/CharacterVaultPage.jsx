import './CharacterVaultPage.scss';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../../constant-variables.js"
import axios from "axios";
import CharacterVaultTable from '../../components/CharacterVaultTable/CharacterVaultTable.jsx';
import UnauthorizedDisplay from '../../components/UnauthorizedDisplay/UnauthorizedDisplay.jsx';
import LoadingDisplay from '../../components/LoadingDisplay/LoadingDisplay.jsx';
import ServerErrorDisplay from '../../components/ServerErrorDisplay/ServerErrorDisplay.jsx';

function CharacterVaultPage() {

  // State variables for the pages data and loading state
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrMsg, setServerErrMsg] = useState("");

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
        setCharacterList(response.data);
        setIsLoading(false);

      }catch(error){
        console.error(error);
        setCharacterList([]);
        setIsLoading(false);
        setServerErrMsg(error.response.data.error)
      }
    }

    if(!!token){
      populateVault(token);
    }else{
      setIsLoading(false);
    }
  }, [token]);


  // TODO look nicer
  if(!token){
    return <UnauthorizedDisplay message={"You must be logged in to view your character vault."} />
  }

  // TODO look nicer
  if (isLoading) {
    return <LoadingDisplay message={"Loading..."} />
  }

  if(!!serverErrMsg){
    return <ServerErrorDisplay message={serverErrMsg} />
  }

  return (
    <section className="character-vault">
      <h1 className="character-vault__heading">Character Vault</h1>
      <input className="character-vault__search" />
      <CharacterVaultTable charactersList={characterList} setCharacterList={setCharacterList}/>
    </section>
  );
}

export default CharacterVaultPage;