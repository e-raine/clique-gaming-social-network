import React, { useState, FormEvent } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '@/services/UserPool';

import './auth.css'

type Props = {
  switchForm: () => void;
};

const SignUpForm: React.FC<Props> = ({ switchForm }) => {
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
      <p className="form-subtext">
        Already have an account?{' '}
        <button className="link" onClick={switchForm}>Log in</button>
      </p>
      <form onSubmit={onSubmit} className="input-box">
        <div className="fullName">
          <div className="fname">
            <label className="form-subtext">First Name</label>
            <input
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="lname">
            <label className="form-subtext">Last Name</label>
            <input
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

        </div>

        <label className="form-subtext">Username</label>
        <input
          className="input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <label className="form-subtext">Email Address</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-subtext">Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">Create account</button>
      </form>
      <div className="continue">
        <hr className="line" />
        <div className="divider">or continue with</div>
        <hr className="line" />
      </div>
      <button className="btn-secondary">Google</button>
    </div>
  );
}

export default SignUpForm;
