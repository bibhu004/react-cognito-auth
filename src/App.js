import './App.css';
import { Route, Routes } from 'react-router-dom';
import SiteNav from './component/common/SiteNav';
import HomePage from './component/home/HomePage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ValidatePage from './component/auth/ValidatePage';
import { useState } from 'react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import PostLoginPage from './component/content/PostLoginPage';
import ForgetPasswordPage from './component/auth/ForgetPasswordPage';

Amplify.configure(awsExports);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function updateAuthStatus(authStatus) {
    setIsAuthenticated(authStatus)
  }

  return (
    <div>
      <SiteNav isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />
      <Routes>
        <Route path='*' element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path='/' exact={true} element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path='/login' element={<LoginPage updateAuthStatus={updateAuthStatus} />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/validate' element={<ValidatePage />} />
        <Route path='/forgetPassword' element={<ForgetPasswordPage />} />
        {/* <Route path='/contacts' element={<Contacts isAuthenticated={isAuthenticated} />} /> */}
        <Route path='/content' element={<PostLoginPage isAuthenticated={isAuthenticated} />} />
      </Routes>
      {/* <SiteFooter /> */}
    </div>
  )
};

export default App;
