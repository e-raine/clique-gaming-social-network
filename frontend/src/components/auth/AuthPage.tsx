import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-bg']} />
      <div className={styles['auth-form']}>
        {isSignUp ? (
          <SignUpForm switchForm={() => setIsSignUp(false)} />
        ) : (
          <SignInForm switchForm={() => setIsSignUp(true)} />
        )}
      </div>
    </div>
  );
}