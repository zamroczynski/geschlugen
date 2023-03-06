import { useState } from "react";
import { insertWord } from "../services/ApiService";

function AddWordForm(props) {
  const [translation, setTranslation] = useState("");
  const [expression, setExpression] = useState("");
  const [imperfekt, setImperfekt] = useState(null);
  const [perfekt, setPerfekt] = useState(null);
  const [errorDesc, setErrorDesc] = useState("");
  const [successDesc, setSuccessDesc] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const handleTranslationChange = (event) => {
    setTranslation(event.target.value);
  };

  const handleExpressionChange = (event) => {
    setExpression(event.target.value);
  };

  const handleImperfektChange = (event) => {
    setImperfekt(event.target.value);
  };

  const handlePerfektChange = (event) => {
    setPerfekt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
        id: null,
        translation: translation,
        expression: expression,
        imperfekt: imperfekt,
        perfekt: perfekt,
        type: selectedMode,
    };
    const config = {
        headers: { Authorization: `Bearer ${props.token}`}
    };
    console.log(config);
    insertWord(body, config).then((res) => {
      console.log("res: ", res);
      if (res === "Unauthorized") {
        setErrorDesc("Sesja wygasła zaloguj się jeszcze raz");
        setSuccessDesc("");
      }
      if (res === "success") {
        setSuccessDesc("Pomyślnie dodano nowe słowo!");
      } else {
        setErrorDesc("Nieznany błąd");
        setSuccessDesc("");
      }
    });
    setExpression("");
    setTranslation("");
    setSelectedLanguage("");
    setSelectedMode("");
    setImperfekt("");
    setPerfekt("");
    event.preventDefault();
  };

  const handleSelectLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSelectMode = (event) => {
    setSelectedMode(event.target.value);
  };

  return (
    <>
    <div className="text-danger">{errorDesc}</div>
    <div className="text-success">{successDesc}</div>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="translation">W języku polskim: </label>
          <input
            type="text"
            value={translation}
            className="form-control form-control-sm"
            placeholder="Po polsku..."
            id="translation"
            onChange={handleTranslationChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="expression">W języku obcym: </label>
          <input
          value={expression}
            type="text"
            className="form-control form-control-sm"
            placeholder="W języku obcym..."
            id="expression"
            onChange={handleExpressionChange}
            required

          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="language">Język:</label>
          <select
            className="form-control form-control-sm"
            id="language"
            required
            size="2"
            onChange={handleSelectLanguage}
            value={selectedLanguage}
          >
            {props.languages.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
        {selectedLanguage === "1" && (
          <div className="form-group mt-2">
            <label htmlFor="language">Tryb:</label>
            <select
              className="form-control form-control-sm"
              id="languageMode"
              required
              size="1"
              name="languageMode"
              onChange={handleSelectMode}
              onFocus={handleSelectMode}
              value={selectedMode}
            >
              <option value="1">
                Słownictwo
              </option>
            </select>
          </div>
        )}

        {selectedLanguage === "2" && (
          <div className="form-group mt-2">
            <label htmlFor="language">Tryb:</label>
            <select
              className="form-control form-control-sm"
              id="languageMode"
              required
              size="2"
              name="languageMode"
              onChange={handleSelectMode}
              value={selectedMode}
            >
              <option value="2">Słownictwo</option>
              <option value="3">Czasowniki nieregularne</option>
            </select>
          </div>
        )}
        {selectedMode === "3" && (
          <div className="form-group mt-2">
            <label htmlFor="imperfekt">Imperfekt: </label>
            <input
              type="text"
              value={imperfekt}
              className="form-control form-control-sm"
              placeholder="Imperfekt..."
              id="imperfekt"
              required
              onChange={handleImperfektChange}
            />
          </div>
        )}
        {selectedMode === "3" && (
          <div className="form- mt-2">
            <label htmlFor="perfekt">Perfekt: </label>
            <input
              type="text"
              value={perfekt}
              className="form-control form-control-sm"
              placeholder="Perfekt..."
              id="perfekt"
              required
              onChange={handlePerfektChange}
            />
          </div>
        )}
        {selectedMode && (
          <div className="form-group mt-2">
            <button className="btn btn-sm btn-success" type="submit">
              Zapisz
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default AddWordForm;
