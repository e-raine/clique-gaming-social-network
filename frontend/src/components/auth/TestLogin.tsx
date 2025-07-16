import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '@/services/UserPool';

import './auth.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Login success:', result);
        const accessToken = result.getAccessToken().getJwtToken();
        console.log('Access token:', accessToken);

        // Handle post-login actions (e.g., redirect, store token, etc.)
      },
      onFailure: (err) => {
        console.error('Login error:', err);
        setLoginError(err.message || 'Login failed');
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired: ", data);
      }
    });
  };

  return (
    <div className="form-box">
      <h2 className="form-title">Log in to your account</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          className="input" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          className="input" 
        //   type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loginError && <p className="form-subtext" style={{ color: 'red' }}>{loginError}</p>}

        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;