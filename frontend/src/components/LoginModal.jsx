import { useState } from "react";
import { getToken } from "../services/ApiService";

function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formDisplay, setFormDisplay] = useState(false);
  const [token, settoken] = useState("");

  const toggleLoginForm = () => {
    if (!formDisplay) {
      setFormDisplay(true);
    } else {
    }
  };
  return (
    <div className="modal fade" id="LoginModal" tabindex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Logowanie</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Zamknij"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={console.log("poszło")} className="">
              <input
                type="text"
                className="me-1 form-control-sm"
                placeholder="Login..."
                required
                autoFocus
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.value)}
                className="me-2 form-control-sm"
                placeholder="Hasło..."
                required
              />
              <button type="submit" className="btn btn-outline-success btn-sm">
                Zaloguj
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Zaloguj
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
