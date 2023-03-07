import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyLogo from "./components/MyLogo";
import SelectLanguage from "./components/SelectLanguage";
import Login from "./components/Login";
import AddWordForm from "./components/AddWordForm";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(false);

  function handleLoginData(data) {
    setToken(data.token);
    setIsLogged(data.isLogged);
  }

  function handleLanguagesData(data) {
    setLanguages(data);
  }

  function handleButtonLogin() {
    setShowLoginForm(true);
  }

  return (
    <div className="container">
      <div className="row">
        <MyLogo />
      </div>
      <div className="row">
      <div className="position-relative mb-5">
        {!showLoginForm && (
          
          <button
            className="btn btn-success btn-sm text-center position-absolute top-0 end-0"
            style={{width: "100px"}}
            onClick={handleButtonLogin}
          >
            Logowanie
          </button>
        )}
        </div>
        {showLoginForm && (
          <Login onDataReceived={handleLoginData} isLogged={isLogged} />
        )}
      </div>
      <div className="row">
        <SelectLanguage onDataReceived={handleLanguagesData} />
      </div>
      <div className="row">
        {isLogged && <AddWordForm token={token} languages={languages} />}
      </div>
    </div>
  );
}

export default App;
