import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import './ForgetPassword.css';

function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null;
  };

  const handleRequestCode = async () => {
    setLoading(true);
    try {
      await Auth.forgotPassword(username);
      toast.success('Verification code sent to your email');
      setStep(2); 
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if(newPassword !== repeatNewPassword){
      toast.error("Passwords do not match");
      return;
    }
    const errorMessage = validatePassword();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }
    if(verificationCode.length === 0){
      toast.error("Enter Verification Code");
      return;
    }

    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Forget Password</h1>
      </div>
      <div className="form-container">
        <form>
          {step === 1 && (
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                placeholder="Enter User Name"
                onChange={(evt) => setUserName(evt.target.value)}
              />
              <div className="button-group">
                <button type="button" onClick={handleRequestCode}>
                  Request Reset Code &gt;&gt;
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
            </div>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <input
                  type="text"
                  id="verificationCode"
                  placeholder="Enter Verification Code"
                  onChange={(evt) => setVerificationCode(evt.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter New Password"
                  onChange={(evt) => setNewPassword(evt.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Repeat New Password</label>
                <input
                  type="password"
                  id="repeatNewPassword"
                  placeholder="Enter Repeat Password"
                  onChange={(evt) => setRepeatNewPassword(evt.target.value)}
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={handlePasswordReset}>
                  Reset Password &gt;&gt;
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
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
