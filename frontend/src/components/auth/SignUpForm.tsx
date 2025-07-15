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
      <input className="input" placeholder="First Name" />
      <input className="input" placeholder="Last Name" />
      <input className="input" placeholder="Username" />
      <input className="input" placeholder="Email Address" />
      <input className="input" type="password" placeholder="Password" />
      <button className="btn-primary">Create account</button>
      <div className="divider">or register with</div>
      <button className="btn-secondary">Google</button>
    </div>
  );
}

export default SignUpForm;
