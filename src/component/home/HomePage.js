import { Link } from 'react-router-dom';
import './Home.css';

function HomePage(props) {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-description">
                <h1 className="home-title">AWS Cognito Authentication</h1>
                <p className="home-description">
                    Authentication is a crucial part of any modern web application. AWS Cognito provides a scalable and secure way to manage user authentication, 
                    including user sign-up, sign-in, and access control.
                </p>
                </div>
                <div className="home-buttons">
                {!props.isAuthenticated ? (
                    <div className="button-group">
                        <Link to="/login" className="home-button">Login</Link>
                        <Link to="/register" className="home-button">Register</Link>
                    </div>
                ) : (
                    <Link to="/content" state={{ authenticated: props.isAuthenticated }} className="home-button">
                        View Contacts
                    </Link>
                )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
