import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyLogo from './components/MyLogo';
import SelectLanguage from './components/SelectLanguage';
import Login from './components/Login';
import AddWordForm from './components/AddWordForm';
import { useState } from 'react';


function App() {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [languages, setLanguages] = useState([]);

  function handleLoginData(data) {
    setToken(data.token);
    setIsLogged(data.isLogged);
  }

  function handleLanguagesData(data) {
    setLanguages(data);
  }

  return (
    <div className='container'>
      <div className='row'><MyLogo /></div>
      <div className='row'><Login onDataReceived={handleLoginData} isLogged={isLogged} /></div>
      <div className='row'><SelectLanguage onDataReceived={handleLanguagesData} /></div>
      <div className='row'>{isLogged && <AddWordForm token={token} languages={languages} />}</div>
    </div>
  )
}

export default App;
