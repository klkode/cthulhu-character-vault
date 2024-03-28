import { useEffect, useState } from 'react';
import './BackgroundSelection.scss';
// import axios from 'axios';
// import { BASE_URL } from '../../constant-variables';

function BackgroundSelection( {selectedId, updateSelectedBackground, backgroundList} ) {
   
    const [selectedLabel, setSelectedLabel] = useState("");

    useEffect(() => {
        if(selectedId !== ""){
            const selectedBackground = backgroundList.find((background) => 
                background.background_id === Number(selectedId)
            );
            setSelectedLabel(selectedBackground.name);
        }
    }, [selectedId, backgroundList]);

    function selectionHandler(event){
        const backgroundId = Number(event.target.value);
        const selectedBackground = backgroundList.find((background) => 
            background.background_id === backgroundId
        );
        setSelectedLabel(selectedBackground.name);
        updateSelectedBackground(selectedBackground);
    }

    return (
        <fieldset className="background-selection">
            <div className="dropdown background-selection__dropdown">
                <button className="btn btn-secondary dropdown-toggle background-selection__option background-selection__option--default" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {!selectedLabel ? "Choose a Background" : selectedLabel }
                </button>
                <ul className="dropdown-menu background-selection__dropdown-menu">
                    {backgroundList.map((background) => {
                        return (
                            <li className="background-selection__option-container" key={background.background_id}>
                                <button className="dropdown-item background-selection__option" type="button"  value={background.background_id} onClick={selectionHandler}>{background.name}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </fieldset>
    );
}

export default BackgroundSelection;