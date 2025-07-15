import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import './auth.css'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className='auth-container'>
      <div className='auth-bg' />
      <div className='auth-form'>
        {isSignUp ? (
          <SignUpForm switchForm={() => setIsSignUp(false)} />
        ) : (
          <SignInForm switchForm={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  );
}