import { useState } from 'react'
import VocabularyMode from './VocabularyMode';


const vocabularyType = [
    {
        id: 1,
        name: "Słownictwo"
    },
    {
        id: 2,
        name: "Czasowniki nieregularne"
    }
];

function ShowModes(props) {
    const [selectedMode, setSelectedMode] = useState('');

    const handleModeClick = (mode) => {
        setSelectedMode(mode);
    };

    const listModes = vocabularyType.map((mode) => 
        <button 
            type="button" 
            className="btn btn-outline-primary"
            key={mode.id}
            onClick={() => handleModeClick(mode.name)}>
            {mode.name}
        </button>
    );
    return (<div>
    <div className="btn-group">
        <div className="btn-group">
            <button className="btn btn-outline-primary" disabled>Wybierz tryb:</button>
            {listModes}
        </div>
    </div>
    {selectedMode && <VocabularyMode mode={selectedMode} language={props.languageName} />}</div>
    )
}

export default ShowModes;