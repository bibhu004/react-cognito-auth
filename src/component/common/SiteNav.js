import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './SiteNav.css';

function SiteNav(props) {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            console.log('Logout');
            await Auth.signOut();
            props.updateAuthStatus(false);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header className="navbar">
            <div className="nav-container">
                <a href="/" className="nav-brand">AWS Cognito Authentication</a>
                <nav className="nav-links">
                    {props.isAuthenticated ? (
                        <button onClick={handleLogout} className="nav-button">Logout</button>
                    ) : (
                        <>
                            <a href="/login" className="nav-link">Login</a>
                            <a href="/register" className="nav-link">Register</a>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default SiteNav;
