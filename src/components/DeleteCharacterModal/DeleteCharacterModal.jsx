import './DeleteCharacterModal.scss';
import axios from "axios";
import { BASE_URL } from "../../constant-variables.js";
import { ReactComponent as CloseIcon } from '../../assets/icons/close-24px.svg';

function DeleteCharacterModal( {name, id, closeModal, setCharacterList, userToken} ) {
    
    const deleteCharacter = async (characterId, token) => {
        try {
            await axios.delete(`${BASE_URL}characters/${characterId}`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            const response = await axios.get(`${BASE_URL}characters`, {
                headers: {
                  Authorization: "Bearer " + token,
                },
            });
            setCharacterList(response.data);
        } catch (error) {
            // TODO notify user?
            console.error(error);
        }
    }

    function closeHandler(event){
        closeModal(true);
    }

    function deleteClickHandler(event){
        deleteCharacter(id, userToken);
        closeModal(true);
    }

    return (
        <div className="delete-character" onClick={closeHandler}>
            <div className="delete-character__card">
                <div className="delete-character__top-container">
                    <h4 className="delete-character__header">Delete Character</h4>
                    <button className="delete-character__top-close-btn" onClick={closeHandler}><CloseIcon /></button>
                </div>
                <div className="delete-character__body-container">
                    <p className="delete-character__body">{`Are you sure you want to delete character ${name}? You cannot delete this action once confirmed.`}</p>
                </div>
                <div className="delete-character__bottom-container">
                    <button className="delete-character__btn delete-character__btn--cancel" onClick={closeHandler}>Cancel</button>
                    <button className="delete-character__btn delete-character__btn--delete" onClick={deleteClickHandler}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCharacterModal;