import React from 'react';

import './auth.css'

type Props = {
  switchForm: () => void;
};

const SignInForm: React.FC<Props> = ({ switchForm }) => {
  return (
    <div className="form-box">
      <h2 className="form-title">Log in</h2>
      <p className="form-subtext">
        Don&apos;t have an account? <button className="link" onClick={switchForm}>Sign up</button>
      </p>
      <div className="input-box">
        <p className="form-subtext">Email</p>
        <input className="input" placeholder="e.g. johndoe@gmail.com" />
        <p className="form-subtext">Password</p>
        <input className="input" type="password" placeholder="Enter your password" />
      </div>
      <button className="btn-primary">Log in</button>
      <div className="continue">
        <hr className="line"/>
        <div className="divider">or continue with</div>
        <hr className="line"/>
      </div>
      <button className="btn-secondary">Google</button>
    </div>

  );
}

export default SignInForm;