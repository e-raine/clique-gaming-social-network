import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '@/services/UserPool';

import './auth.css'

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send all required attributes
    const attributeList: CognitoUserAttribute[] = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
      new CognitoUserAttribute({ Name: 'nickname', Value: nickname }),
    ];

    UserPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        console.error('Signup error:', err);
        return;
      }

      console.log('Signup success:', result);
    });
  };

  return (
    <div className="form-box">
      <h2 className="form-title">Create an account</h2>
      <form onSubmit={onSubmit}>

        {/* Required name fields */}
        <label>First Name</label>
        <input className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

        <label>Last Name</label>
        <input className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

        <label>Username</label>
        <input className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} required />

        <label>Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
