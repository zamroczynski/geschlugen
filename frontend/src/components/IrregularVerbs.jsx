import { useState, useRef, useEffect } from "react";
import { getVocabulary } from "../services/ApiService";

function IrregularVerbs(props) {
  const [vocabulary, setVocabulary] = useState([]);
  const [rows, setRows] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [allGuessed, setAllGuessed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedField, setSelectedField] = useState(1);
  const [placeholderExpression, setPlaceholderExpression] = useState("");
  const [placeholderImperfekt, setPlaceholderImperfekt] = useState("");
  const [placeholderPerfekt, setPlaceholderPerfekt] = useState("");
  const inputRefExpression = useRef(null);
  const inputRefImperfekt = useRef(null);
  const inputRefPerfekt = useRef(null);

  useEffect(() => {
    if (props.mode > 0) {
      setDataReady(false);
      getVocabulary(props.mode).then((res) => {
        setVocabulary(res);
        setDataReady(true);
      });
    }
  }, []);

  const NewTable = () => {
    const handleButton = (id, correctAnswer, loopIndex, field) => {
      const newData = [...rows];
      if (field === 1) {
        newData[loopIndex].userAnswerExpression = "";
        setRows(newData);
        inputRefExpression.current.focus();
        setPlaceholderExpression(correctAnswer);
        setSelectedField(1);
      }
      if (field === 2) {
        newData[loopIndex].userAnswerImperfekt = "";
        setPlaceholderImperfekt(correctAnswer);
        setSelectedField(2);
      }
      if (field === 3) {
        newData[loopIndex].userAnswerPerfekt = "";
        setPlaceholderPerfekt(correctAnswer);
        setSelectedField(3);
      }
    };

    const handleInputChangeExpression = (e, correctAnswer, loopIndex) => {
      const newData = [...rows];
      const inputValue = e.target.value;
      newData[loopIndex].userAnswerExpression = inputValue;
      setRows(newData);
      setInputValue(inputValue);
      if (inputValue === correctAnswer) {
        newData[loopIndex].expressionFocus = false;
        newData[loopIndex].isDisabled = true;
        newData[loopIndex].imperfektIsDisabled = false;
        newData[loopIndex].imperfektFocus = true;
        setRows(newData);
        setSelectedField(2);
      }
    };

    const handleInputChangeImperfekt = (e, correctAnswer, loopIndex) => {
      const newData = [...rows];
      const inputValue = e.target.value;
      newData[loopIndex].userAnswerImperfekt = inputValue;
      setRows(newData);
      setInputValue(inputValue);
      if (inputValue === correctAnswer) {
        newData[loopIndex].imperfektFocus = false;
        newData[loopIndex].imperfektIsDisabled = true;
        newData[loopIndex].perfektIsDisabled = false;
        newData[loopIndex].perfektFocus = true;
        setRows(newData);
        setSelectedField(3);
      }
    };

    const handleInputChange3 = (e, correctAnswer, loopIndex) => {
      const newData = [...rows];
      const inputValue = e.target.value;
      newData[loopIndex].userAnswerPerfekt = inputValue;
      setRows(newData);
      setInputValue(inputValue);
      if (inputValue === correctAnswer) {
        newData[loopIndex].perfektIsDisabled = true;
        newData[loopIndex].perfektFocus = false;
        setRows(newData);
        let index = loopIndex + 1;
        if (vocabulary.length === index) {
          setAllGuessed(true);
        } else {
          const nextRow = vocabulary[index];
          Object.assign(nextRow, {
              userAnswerExpression: "",
              userAnswerImperfekt: "",
              userAnswerPerfekt: "",
              isDisabled: false,
              imperfektIsDisabled: true,
              perfektIsDisabled: true,
              expressionFocus: true,
              imperfektFocus: false,
              perfektFocus: false,
            });
          console.log("next row:", nextRow);
          newData[loopIndex].expressionFocus = true;
          newData[loopIndex].isDisabled = false;
          setRows([...newData, nextRow]);
          setInputValue("");
        }
      }
    };

    return (
      <table className="table table-sm table-striped table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">Polski</th>
            <th scope="col">{props.language}</th>
            <th scope="col">Imperfekt</th>
            <th scope="col">Perfekt</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((word, index) => (
            <tr key={word.id}>
              <td>{word.translation}</td>
              <td>
                <input
                  className="form-control-sm"
                  type="text"
                  value={word.userAnswerExpression}
                  id={word.id}
                  onChange={(e) =>
                    handleInputChangeExpression(e, word.expression, index)
                  }
                  ref={inputRefExpression}
                  disabled={word.isDisabled}
                  placeholder={placeholderExpression}
                  autoFocus={word.expressionFocus}
                />
                <button
                  className="btn btn-outline-light m-1"
                  onClick={() => handleButton(word.id, word.expression, index)}
                  disabled={word.isDisabled}
                >
                  Pokaż
                </button>
              </td>
              <td>
                <input
                  autoFocus={word.imperfektFocus}
                  className="form-control-sm"
                  type="text"
                  value={word.userAnswerImperfekt}
                  id={word.id + 1}
                  onChange={(e) =>
                    handleInputChangeImperfekt(e, word.imperfekt, index)
                  }
                  ref={inputRefImperfekt}
                  disabled={word.imperfektIsDisabled}
                />
                <button
                  className="btn btn-outline-light m-1"
                  onClick={() =>
                    handleButton(word.id, word.imperfekt, index, 2)
                  }
                  disabled={word.imperfektIsDisabled}
                >
                  Pokaż
                </button>
              </td>
              <td>
                <input
                  className="form-control-sm"
                  type="text"
                  value={word.userAnswerPerfekt}
                  id={word.id + 2}
                  onChange={(e) =>
                    handleInputChange3(e, word.perfekt, index, 3)
                  }
                  ref={inputRefPerfekt}
                  disabled={word.perfektIsDisabled}
                  autoFocus={selectedField === 3}
                />
                <button
                  className="btn btn-outline-light m-1"
                  onClick={() => handleButton(word.id, word.perfekt, index, 3)}
                  disabled={word.perfektIsDisabled}
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
        userAnswerExpression: "",
        userAnswerImperfekt: "",
        userAnswerPerfekt: "",
        imperfekt: vocabulary[0].imperfekt,
        perfekt: vocabulary[0].perfekt,
        imperfektIsDisabled: true,
        perfektIsDisabled: true,
        expressionFocus: true,
        imperfektFocus: false,
        perfektFocus: false,
      },
    ]);
  }
  //   console.log("vocabulary:", vocabulary);
  return (
    <div className="table-responsive">
      <div>{props.language}:</div>
      {dataReady && NewTable(vocabulary)}
      {allGuessed && "Wygrana!"}
    </div>
  );
}

export default IrregularVerbs;
