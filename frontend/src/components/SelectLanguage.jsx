import { useState } from 'react'
import ShowModes from './ShowModes';


const languages = [
    {
        id: 1,
        name: 'Niemiecki'
    },
    {
        id: 2,
        name: 'Angielski'
    }
]

function SelectLanguage() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedLanguageId, setSelectedLanguageId] = useState('');
    const [showButtons, setShowButtons] = useState(true);

    const handleLanguageClick = (language, id) => {
        setSelectedLanguage(language);
        setSelectedLanguageId(id);
        setShowButtons(false);
    };

    return (
        <div>
                
                <div className="d-flex align-items-center justify-content-center">
                {languages.map((languages) => {
                    return (
                        <div className="center" key={languages.id}>
                            {showButtons && (<button 
                                type="button" 
                                className="btn btn-primary m-1 btn-lg" 
                                id={languages.id}
                                onClick={() => handleLanguageClick(languages.name, languages.id)}>
                                {languages.name}
                            </button>)}
                        </div>
                    )
                })}
            </div>
            {!showButtons && selectedLanguage && <ShowModes languageName={selectedLanguage} languageId={selectedLanguageId}/>}
        </div>
    );
}

export default SelectLanguage;