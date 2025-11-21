# Redux Setup Documentation

## Simplified Redux Architecture

This project uses a **simplified Redux setup** with automatic state persistence using `redux-persist`.

## Directory Structure

```
src/
├── store/
│   ├── store.js          # Redux store configuration with redux-persist
│   ├── authSlice.js      # Auth slice with reducers and selectors
│   └── hooks.js          # Typed Redux hooks
├── app/
│   └── layout.jsx        # Root layout wrapping children with ReduxProvider
└── components/
    └── ReduxProvider.jsx # Provider component with PersistGate
```

## Key Features

### 1. **Automatic State Persistence**
- Uses `redux-persist` to automatically save Redux state to localStorage
- No manual `localStorage.setItem()` or `localStorage.getItem()` calls needed
- State automatically rehydrates on page refresh

### 2. **Clean Store Configuration** (`store/store.js`)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist auth state
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
```

### 3. **Simple Auth Slice** (`store/authSlice.js`)
```javascript
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
```

### 4. **Provider Wrapper** (`components/ReduxProvider.jsx`)
```javascript
'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
```

### 5. **Layout Integration** (`app/layout.jsx`)
```javascript
import { ReduxProvider } from "@/components/ReduxProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
```

## Usage Examples

### Dispatching Actions
```javascript
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';

const dispatch = useAppDispatch();

// Login
dispatch(setCredentials({ user, token }));

// Logout
dispatch(logout());
```

### Using Selectors
```javascript
import { useAppSelector } from '@/store/hooks';
import { selectUser, selectIsAuthenticated } from '@/store/authSlice';

const user = useAppSelector(selectUser);
const isAuthenticated = useAppSelector(selectIsAuthenticated);
```

## Benefits of This Approach

1. **No Manual localStorage Management** - redux-persist handles everything
2. **Cleaner Code** - No need for `setUserData()`, `getUserData()`, etc.
3. **Automatic Persistence** - State persists across page refreshes
4. **Type-Safe Selectors** - Centralized selectors for accessing state
5. **Simple Provider** - Just wrap children, no complex initialization logic
6. **Maintainable** - All Redux logic in one place (store directory)

## What Changed from Previous Setup

### Before (Complex):
- Manual `localStorage.setItem()` and `localStorage.getItem()` calls
- Separate `setUserData()` and `getUserData()` functions
- Complex `AuthInitializer` component with `useEffect` hooks
- Manual state synchronization between localStorage and Redux

### After (Simple):
- Redux-persist handles all persistence automatically
- No manual localStorage functions needed
- Simple `ReduxProvider` with `PersistGate`
- Single source of truth (Redux store)

## Cookie Management

We still use cookies for the JWT token (for security and HTTP-only option in production):
- `setAuthCookie(token)` - Sets cookie with 3-hour expiration
- `getAuthToken()` - Gets token from cookie
- `removeAuthCookie()` - Removes token cookie

The user data is persisted via redux-persist in localStorage automatically.
