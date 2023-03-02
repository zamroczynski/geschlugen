import { useState, useRef } from 'react'


const vocabulary = [
    {
        id: 1,
        translation: "dupa",
        expression: "ass"
    },
    {
        id: 2,
        translation: "cyce",
        expression: "tits"
    },
    {
        id: 3,
        translation: "pipa",
        expression: "pussy"
    },
    {
        id: 4,
        translation: "kot",
        expression: "cat"
    },
    {
        id: 5,
        translation: "pies",
        expression: "dog"
    },
    {
        id: 6,
        translation: "kutas",
        expression: "dick"
    },
    {
        id: 7,
        translation: "Bardzo długie zdanie po polsku, które na pewno nie zostanie przetłumaczonelol",
        expression: "dupa"
    }
];



function VocabularyMode(props) {
    const [allGuessed, setAllGuessed] = useState(false);
    const [rows, setRows] = useState([{ id: 1, expression: '', isDisabled: false }]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleButton = (id) => {
        const item = vocabulary.find((item) => item.id === id);
        setInputValue(item.expression);
        inputRef.current.value = '';
        inputRef.current.focus();
    };

    const handleInputChange = (e, rowIndex, id) => {
        const { value } = e.target;
        const newData = [...rows];
        newData[rowIndex].expression = value;
        setRows(newData);

        const foundItem = (vocabulary, id, valuee) => {
            return vocabulary.find((item) => item.expression === valuee && item.id === id);
        };


        if (foundItem(vocabulary, id, value)) {
            const lastObject = vocabulary[vocabulary.length - 1];
            if (lastObject.id === foundItem.id) {
                setAllGuessed(true);
            } else {
                e.target.disabled = true;
                setRows([...newData, { id: rows.length + 1, expression: '', isDisabled: false }]);
                setInputValue('');
            }
        }
    };

    const handleValue = () => {

    }

    const showTable = (() => {
        return (
            <table className="table table-sm table-striped table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Polski</th>
                        <th scope="col">{props.language}</th>
                    </tr>
                </thead>
                <tbody>
                    {allGuessed ? (<p>Wygrana!</p>) :
                        rows.map((row, index) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{vocabulary.find((item) => item.id === row.id).translation}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.expression}
                                        id={row.id}
                                        onChange={(e) => handleInputChange(e, index, row.id)}
                                        disabled={row.isDisabled}
                                        placeholder={inputValue}
                                        ref={inputRef}
                                        autoFocus />
                                    <button 
                                        className='btn btn-outline-light m-1' 
                                        onClick={() => handleButton(row.id)}>
                                        Pokaż
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        )
    })

    return (
        <div className='table-responsive'>
            <div>{props.mode}:</div>
            {showTable()}
        </div>
    )
}

export default VocabularyMode;