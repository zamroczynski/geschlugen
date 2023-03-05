import { useState, useRef, useEffect } from "react";
import { getVocabulary } from "../services/ApiService";


export function foundTranslation(props) {
    const translation = props.vocabulary.find((item) => item.id === props.id);
    return translation.translation;
  };

function ShowTable(props) {
  const [vocabulary, setVocabulary] = useState([]);
  const [allGuessed, setAllGuessed] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [rows, setRows] = useState([
    { id: 1, expression: "", isDisabled: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    getVocabulary(props.mode).then((res) => {
      console.log(res);
      setVocabulary(res);
    });
    setDataReady(true);
  }, []);

  const handleButton = (id) => {
    const item = vocabulary.find((item) => item.id === id);
    setInputValue(item.expression);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleInputChange = (e, rowIndex, id) => {
    const { value } = e.target;
    const newData = [...rows];
    newData[rowIndex].expression = value;
    setRows(newData);

    const foundItem = (vocabulary, id, valuee) => {
      return vocabulary.find(
        (item) => item.expression === valuee && item.id === id
      );
    };

    

    if (foundItem(vocabulary, id, value)) {
      const lastObject = vocabulary[vocabulary.length - 1];
      if (lastObject.id === foundItem.id) {
        setAllGuessed(true);
      } else {
        e.target.disabled = true;
        setRows([
          ...newData,
          { id: rows.length + 1, expression: "", isDisabled: false },
        ]);
        setInputValue("");
      }
    }
  };

  return (<>
    <table className="table table-sm table-striped table-responsive-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Polski</th>
          <th scope="col">{props.language}</th>
        </tr>
      </thead>
      <tbody>
        {!dataReady ? (
          <p>Ładowanie danych...</p>
        ) : (
          rows.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td></td>
              <td>
                <input
                  type="text"
                  value={row.expression}
                  id={row.id}
                  onChange={(e) => handleInputChange(e, index, row.id)}
                  disabled={row.isDisabled}
                  placeholder={inputValue}
                  ref={inputRef}
                  autoFocus
                />
                <button
                  className="btn btn-outline-light m-1"
                  onClick={() => handleButton(row.id)}
                >
                  Pokaż
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table></>
  );
}

export default ShowTable;
