'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { initializeAuth } from '@/store/authSlice';
import { getAuthToken, getUserData } from '@/lib/api';

function AuthInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for existing token and user data on mount
    const token = getAuthToken();
    const user = getUserData();
    
    if (token && user) {
      // Initialize auth with both token and user data
      dispatch(initializeAuth({ user, token }));
    } else if (token && !user) {
      // Token exists but no user data - clear the token
      dispatch(initializeAuth({ user: null, token: null }));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
