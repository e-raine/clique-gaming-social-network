import React from 'react';

import './auth.css'

type Props = {
  switchForm: () => void;
};

const SignUpForm: React.FC<Props> = ({ switchForm }) => {
  return (
    <div className="form-box">
      <h2 className="form-title">Create an account</h2>
      <p className="form-subtext">
        Already have an account?{' '}
        <button className="link" onClick={switchForm}>Log in</button>
      </p>
      <div className="input-box">
        <div className="fullName">
          <div className="fname">
            <p className="form-subtext">First Name</p>
            <input className="input" placeholder="e.g. John" />
          </div>
          <div className="lname">
            <p className="form-subtext">Last Name</p>
            <input className="input" placeholder="e.g. Doe" />
          </div>
        </div>
        <p className="form-subtext">Username</p>
        <input className="input" placeholder="e.g. john.loves.dogs" />
        <p className="form-subtext">Email Address</p>
        <input className="input" placeholder="e.g. johndoe@gmail.com" />
        <p className="form-subtext">Password</p>
        <input className="input" type="password" placeholder="Enter your password" />
      </div>
      <button className="btn-primary">Create account</button>
      <div className="continue">
        <hr className="line"/>
        <div className="divider">or continue with</div>
        <hr className="line"/>
      </div>
      <button className="btn-secondary">Google</button>
    </div>
  );
}

export default SignUpForm;
