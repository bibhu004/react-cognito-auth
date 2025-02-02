import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import "./Validate.css";
import { toast } from "react-toastify";

function ValidatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [authenticationCode, setAuthenticationCode] = useState("");

  useEffect(() => {
    if (location.state && location.state.username) {
      setUserName(location.state.username);
    }
  }, [location.state]);

  const handleRegisterConfirmation = async () => {
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Validate</h1>
      </div>
      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter User Name"
              onChange={(evt) => setUserName(evt.target.value)}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="authenticationCode">Authentication Code</label>
            <input
              type="text"
              id="authenticationCode"
              placeholder="Enter Authentication Code"
              onChange={(evt) => setAuthenticationCode(evt.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleRegisterConfirmation}>
              Validate &gt;&gt;
            </button>
            <Link to="/">
              <button type="button" className="outline">
                Cancel
              </button>
            </Link>
            {loading && (
              <div className="loading-overlay">
                <div className="loading-text">Loading, please wait...</div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ValidatePage;

