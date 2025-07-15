import React from 'react';

import './auth.css'

type Props = {
  switchForm: () => void;
};

const SignInForm: React.FC<Props> = ({ switchForm }) => {
  return (
    <div className="form-box">
      <h2 className="form-title">Log in to your account</h2>
      <p className="form-subtext">
        Don't have an account? <button className="link" onClick={switchForm}>Sign up</button>
      </p>
      <input className="input" placeholder="Email Address or Username" />
      <input className="input" type="password" placeholder="Password" />
      <button className="btn-primary">Log in</button>
      <div className="divider">or continue with</div>
      <button className="btn-secondary">Google</button>
    </div>

  );
}

export default SignInForm;