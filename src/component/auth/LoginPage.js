import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './Login.css';
import { toast } from 'react-toastify';

function LoginPage(props) {
    const navigate = useNavigate();
    
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (!passwordRegex.test(password)) {
            return "Password must be at least 8 characters long and include at least \n1 uppercase letter,\n1 lowercase letter,\n1 number, \n1 special character.";
        }
        return null;
    }

    const handleLogin = async () => {
        const errorMessage = validatePassword();
        if (errorMessage) {
            toast.error(errorMessage);
            return;
        }
        setLoading(true);
        try {
            await Auth.signIn(username, password);
            props.updateAuthStatus(true);
            navigate('/content');
        } catch (err) {
            console.log(err);
            const displayMessage = err.message || "An error occurred during login.";
            toast.error(displayMessage);
        } finally {
            setLoading(false);
          }
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Login</h1>
            </div>
            <div className="form-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter User Name"
                            onChange={evt => setUserName(evt.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            minLength="8"
                            placeholder="Enter Password"
                            onChange={evt => setPassword(evt.target.value)}
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" onClick={handleLogin}>Login &gt;&gt;</button>
                        <Link to="/forgetPassword">
                            <button type="button" className="outline">Forgot Your Password?</button>
                        </Link>
                        <Link to="/register">
                            <button type="button" className="outline">Register</button>
                        </Link>
                        <Link to="/">
                            <button type="button" className="outline">Cancel</button>
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

export default LoginPage;

