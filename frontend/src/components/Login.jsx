import { useState } from "react";
import { getToken } from "../services/ApiService";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      if (res === "Unauthorized") {
        setErrorDesc("Błądy login lub hasło");
      } else {
        setErrorDesc("");
        props.onDataReceived({"token": res.token, "isLogged": true});
      }
    });
    
  };

  return (
    <div className="text-center mb-3">
      <form onSubmit={handleSubmit}>
      {!props.isLogged && <>
        <input
          type="text"
          className="me-1 form-control-sm"
          placeholder="Login..."
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          onChange={handlePasswordChange}
          className="form-control-sm me-1"
          placeholder="Hasło..."
          required
        />
        <button
          type="submit"
          className="btn btn-outline-success btn-sm"
        >
          Zaloguj
        </button>
        </>}
        <div className="text-danger">{errorDesc}</div>
      </form>
    </div>
  );
}

export default Login;
