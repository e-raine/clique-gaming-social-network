import React from 'react';

import styles from './AuthPage.module.css';

type Props = {
  switchForm: () => void;
};

const SignUpForm: React.FC<Props> = ({ switchForm }) => {
  return (
    <div className={styles.formBox}>
      <h2 className={styles.formTitle}>Create an account</h2>
      <p className={styles.formSubtext}>
        Already have an account?{' '}
        <button className={styles.link} onClick={switchForm}>Log in</button>
      </p>
      <input className={styles.input} placeholder="First Name" />
      <input className={styles.input} placeholder="Last Name" />
      <input className={styles.input} placeholder="Username" />
      <input className={styles.input} placeholder="Email Address" />
      <input className={styles.input} type="password" placeholder="Password" />
      <button className={styles.btnPrimary}>Create account</button>
      <div className={styles.divider}>or register with</div>
      <button className={styles.btnSecondary}>Google</button>
    </div>
  );
}

export default SignUpForm;
