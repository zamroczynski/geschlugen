import { useState } from "react";
import { getToken } from "../services/ApiService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorDesc, setErrorDesc] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getToken(username, password).then((res) => {
      console.log("res: ", res);
      if (res === "Unauthorized") {
        setErrorDesc("Błądy login lub hasło");
      } else {
        setErrorDesc("");
        setToken(res.token);
        setIsLogged(true);
      }
    });
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="needs-validation was-validated">
      {!isLogged && <>
        <input
          type="password"
          onChange={handlePasswordChange}
          className="form-control-sm float-end"
          placeholder="Hasło..."
          required
        />
        <input
          type="text"
          className="me-1 form-control-sm float-end"
          placeholder="Login..."
          onChange={handleUsernameChange}
          required
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-outline-success float-end btn-sm me-1"
        >
          Zaloguj
        </button>
        </>}
        
        <label className="text-danger float-end">{errorDesc}</label>
      </form>
      {isLogged && <>
        <button>dodaj słowo</button>
      </>}
    </div>
  );
}

export default Login;
