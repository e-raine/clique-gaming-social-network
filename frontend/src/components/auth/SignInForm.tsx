import React from 'react';

import styles from './AuthPage.module.css';

type Props = {
  switchForm: () => void;
};

const SignInForm: React.FC<Props> = ({ switchForm }) => {
  return (
    <div className={styles.formBox}>
      <h2 className={styles.formTitle}>Log in to your account</h2>
      <p className={styles.formSubtext}>
        Don't have an account? <button className={styles.link} onClick={switchForm}>Sign up</button>
      </p>
      <input className={styles.input} placeholder="Email Address or Username" />
      <input className={styles.input} type="password" placeholder="Password" />
      <button className={styles.btnPrimary}>Log in</button>
      <div className={styles.divider}>or continue with</div>
      <button className={styles.btnSecondary}>Google</button>
    </div>

  );
}

export default SignInForm;