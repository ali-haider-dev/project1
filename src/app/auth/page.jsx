'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/authSlice';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();


  useEffect(() => {
console.log("isAuthenticated authpage",isAuthenticated);
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Don't render auth forms if user is already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <>
      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <SignupForm onToggleForm={() => setIsLogin(true)} />
      )}
    </>
  );
}
