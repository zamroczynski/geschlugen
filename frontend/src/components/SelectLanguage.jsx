import { useState, useEffect } from "react";
import ShowModes from "./ShowModes";
import { getLanguages } from "../services/ApiService";

function SelectLanguage(props) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLanguageId, setSelectedLanguageId] = useState("");
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    getLanguages().then((res) => {
      setLanguages(res);
      props.onDataReceived(res);
    });
  }, []);

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
              {showButtons && (
                <button
                  type="button"
                  className="btn btn-primary m-1 btn-lg"
                  id={languages.id}
                  onClick={() =>
                    handleLanguageClick(languages.name, languages.id)
                  }
                >
                  {languages.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {!showButtons && selectedLanguage && (
        <ShowModes
          languageName={selectedLanguage}
          languageId={selectedLanguageId}
        />
      )}
    </div>
  );
}

export default SelectLanguage;
