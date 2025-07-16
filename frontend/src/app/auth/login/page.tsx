'use client';

import AuthPage from '@/components/auth/AuthPage';
import Signup from '@/components/auth/TestSignup';
import TestLogin from '@/components/auth/TestLogin';

export default function LoginPage() {
  return<>
    <div className='flex gap-20 items-center content-center'>
      <Signup />
      <TestLogin />;
    </div>
  </>
}