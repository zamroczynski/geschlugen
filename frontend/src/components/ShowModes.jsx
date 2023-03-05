import { useState, useEffect } from "react";
import VocabularyMode from "./VocabularyMode";
import { getVocabularyType } from "../services/ApiService";
import IrregularVerbs from "./IrregularVerbs";

function ShowModes(props) {
  const [vocabularyType, setVocabularyType] = useState([]);
  const [selectedMode, setSelectedMode] = useState("");

  useEffect(() => {
    getVocabularyType(props.languageId).then((res) => {
      setVocabularyType(res);
    });
  }, []);

  const handleModeClick = (mode) => {
    setSelectedMode(mode);
  };

  function DisplayMode(props) {
    if (props.mode === 1 || props.mode === 2) {
      return  <VocabularyMode mode={props.mode} language={props.languageName} />
    } else {
      return <IrregularVerbs mode={props.mode} language={props.languageName} />
    }
  };

  const listModes = vocabularyType.map((mode) => (
    <button
      type="button"
      className={selectedMode === mode.id ? "btn btn-outline-primary active" : 'btn btn-outline-primary'}
      key={mode.id}
      onClick={() => handleModeClick(mode.id)}
    >
      {mode.name}
    </button>
  ));
  return (
    <div>
      <div className="btn-group">
        <div className="btn-group">
          <button className="btn btn-outline-primary" disabled>
            Wybierz tryb:
          </button>
          {listModes}
        </div>
      </div>
      <DisplayMode mode={selectedMode} languageName={props.languageName} />
    </div>
  );
}

export default ShowModes;
