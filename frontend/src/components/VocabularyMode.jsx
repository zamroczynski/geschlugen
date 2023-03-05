import { useState, useRef, useEffect } from "react";
import { getVocabulary } from "../services/ApiService";

function VocabularyMode(props) {
  const [vocabulary, setVocabulary] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [allGuessed, setAllGuessed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setDataReady(false);
    getVocabulary(props.mode).then((res) => {
      setVocabulary(res);
      setDataReady(true);
    });
  }, []);

  const NewTable = () => {
    const handleButton = (id, correctAnswer, loopIndex) => {
      const newData = [...rows];
      newData[loopIndex].userAnswer = "";
      setInputValue(correctAnswer);
      inputRef.current.focus();
    };

    const handleInputChange = (e, correctAnswer, loopIndex) => {
      const newData = [...rows];
      const inputValue = e.target.value;
      newData[loopIndex].userAnswer = inputValue;
      setRows(newData);
      setInputValue(inputValue);
      if (inputValue === correctAnswer) {
        e.target.disabled = true;
        let index = loopIndex + 1;
        if (vocabulary.length === index) {
          setAllGuessed(true);
        } else {
          const nextRow = vocabulary[index];
          setRows([...newData, nextRow]);
          setInputValue("");
        }
      }
    };
    console.log("inputValue: ", inputValue);
    return (
      <table className="table table-sm table-striped table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">Numer</th>
            <th scope="col">Polski</th>
            <th scope="col">Angielski</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((word, index) => (
            <tr key={word.id}>
              <td>{word.id}</td>
              <td>{word.translation}</td>
              <td>
                      <input
                        className="form-control-sm"
                        type="text"
                        value={word.userAnswer}
                        id={word.id}
                        onChange={(e) =>
                          handleInputChange(e, word.expression, index)
                        }
                        placeholder={inputValue}
                        ref={inputRef}
                        disabled={word.isDisabled}
                        autoFocus
                      />
                    <button
                      className="btn btn-outline-light m-1"
                      onClick={() => handleButton(word.id, word.expression, index)}
                    >
                      Pokaż
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  if (rows.length === 0 && vocabulary.length) {
    setRows([
      {
        id: vocabulary[0].id,
        expression: vocabulary[0].expression,
        translation: vocabulary[0].translation,
        isDisabled: false,
        userAnswer: "",
      },
    ]);
  }
  return (
    <div className="table-responsive">
      <div>{props.language}:</div>
      {dataReady && NewTable(vocabulary)}
      {allGuessed && "Wygrana!"}
    </div>
  );
}

export default VocabularyMode;
