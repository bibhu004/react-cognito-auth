import { Link, Navigate } from 'react-router-dom';
import './PostLogin.css';


function PostLoginPage() {
 
    return (
        <div className="post-login-container">
            <h1 className="post-login-title">🎉 Congratulations! 🎉</h1>
            <p className="post-login-message">
                You have successfully logged in using AWS Cognito.  
                Now you can explore your dashboard and manage your account securely.
            </p>
            {/* <Link to="/logout">
                <button className="logout-button">Logout</button>
            </Link> */}
        </div>
    );
}

export default PostLoginPage;
