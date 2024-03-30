import './CharacterVaultRow.scss';
import { Link, useNavigate } from 'react-router-dom';
import DeleteCharacterModal from '../DeleteCharacterModal/DeleteCharacterModal';
import { useState } from 'react';

function CharacterVaultRow({ id, name, background, setCharacterList }) {

    const [hideModal, setHideModal] = useState(true);

    // Make navigate to got to edit page on button click
    const navigate = useNavigate();

    function editClickHandler(event){
        // TODO
        navigate(`/characters/${id}/edit`);
    }

    function deleteClickHandler(event){
        setHideModal(false);
    }

    return (
        <div className="vault-row">
            <div className="vault-row__name-container">
                <Link className="vault-row__name" to={`/characters/${id}`}>{name}</Link>
            </div>
            <div className="vault-row__background-container">
                <p className="vault-row__background">{background}</p>
            </div>
            <div className="vault-row__actions-container">
                <button className="vault-row__action-btn" onClick={editClickHandler}>EDIT</button>
                <button className="vault-row__action-btn" onClick={deleteClickHandler}>DELETE</button>
            </div>
            {!hideModal &&
            <DeleteCharacterModal id={id} name={name} closeModal={setHideModal} setCharacterList={setCharacterList} userToken={sessionStorage.getItem("token")} />}
            {/* {TODO: SHOW SUCCESS MODAL} */}
        </div>
    );
}

export default CharacterVaultRow;