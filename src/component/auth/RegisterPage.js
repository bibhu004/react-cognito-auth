
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import "./Register.css";
// import axiosInstance from "../../axiosConfig";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (repeatPassword === "") {
      setPasswordMatchMessage("");
    } else if (password === repeatPassword) {
      setPasswordMatchMessage("Passwords match");
    } else {
      setPasswordMatchMessage("Passwords do not match");
    }
  }, [password, repeatPassword]);

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password !== repeatPassword) {
      return "Passwords do not match.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null;
  };

  const handleRegister = async () => {

    const usernameHasSpace = /\s/.test(username); // Check for spaces
    const usernameHasUppercase = /[A-Z]/.test(username); // Check for uppercase letters

    if (usernameHasSpace || usernameHasUppercase) {
      toast.warning("Username should not contain spaces or uppercase letters");
      return;
    }
    
    const errorMessage = validatePassword();
    if (errorMessage) {
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    // const response = null;
    try {


      const { user } = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
        },
      });
      const springUser = {
        springUserName: username,
        springEmail: email,
      };
      console.log("spring user " + springUser.springEmail + " m s  " + springUser.springUserName);
        // await axiosInstance.post("/users/hey", springUser);
      navigate("/validate", { state: { username: username } });

    } catch (err) {
      console.log(err);
    //   await axiosInstance.delete('/user/'+response.data.id);

      if (err.code === "UsernameExistsException") {
        toast.error("User already exists");
      } else {
        toast.error("Error in registering:" + err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Register</h1>
      </div>
      <div className="form-container">
        <form>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter User Name"
              onChange={(evt) => setUserName(evt.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <small>We'll never share your email!</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              minLength="8"
              placeholder="Enter Password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat-password">Repeat Password</label>
            <input
              type="password"
              id="repeat-password"
              minLength="8"
              placeholder="Repeat Password"
              onChange={(evt) => setRepeatPassword(evt.target.value)}
            />
            {passwordMatchMessage && (
              <small
                className={
                  passwordMatchMessage === "Passwords match"
                    ? "success"
                    : "error"
                }
              >
                {passwordMatchMessage}
              </small>
            )}
          </div>

          <div className="button-group">
            <button type="button" onClick={handleRegister}>
              Register &gt;&gt;
            </button>
            <Link to="/login">
              <button type="button" className="outline">
                Login
              </button>
            </Link>
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

export default RegisterPage;

