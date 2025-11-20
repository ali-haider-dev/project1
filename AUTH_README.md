# Next.js 16 Authentication App

A modern, full-featured authentication system built with Next.js 16, Redux Toolkit, and JWT tokens.

## Features

✨ **Beautiful UI**
- Modern glassmorphism design with gradient backgrounds
- Smooth animations and transitions
- Dark mode support
- Fully responsive layout

🔐 **Authentication**
- Login and Signup forms with validation
- JWT token-based authentication
- Secure cookie storage (3-hour expiration)
- Automatic token cleanup on logout
- Protected routes

📦 **State Management**
- Redux Toolkit for global state
- Persistent authentication state
- Type-safe with TypeScript

🛡️ **Security**
- HTTP-only cookies (configurable)
- Automatic token expiration (3 hours)
- CSRF protection with SameSite cookies
- Secure cookies in production

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Cookie Management**: js-cookie
- **Styling**: CSS Modules + Tailwind CSS

## API Endpoints

The app connects to the following API endpoints:

- **Signup**: `https://express-api-black-kappa.vercel.app/api/auth/signup`
  - Fields: `name`, `email`, `password`, `role` (default: "user")
  
- **Login**: `https://express-api-black-kappa.vercel.app/api/auth/login`
  - Fields: `email`, `password`

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   └── page.tsx          # Auth page (login/signup toggle)
│   ├── dashboard/
│   │   ├── page.tsx          # Protected dashboard
│   │   └── dashboard.module.css
│   ├── layout.tsx            # Root layout with Redux provider
│   ├── page.tsx              # Home page (redirects)
│   └── globals.css           # Global styles
├── components/
│   ├── LoginForm.tsx         # Login form component
│   ├── SignupForm.tsx        # Signup form component
│   ├── AuthForm.module.css   # Shared auth form styles
│   └── ReduxProvider.tsx     # Redux provider wrapper
├── store/
│   ├── store.ts              # Redux store configuration
│   ├── authSlice.ts          # Auth state slice
│   └── hooks.ts              # Typed Redux hooks
└── lib/
    └── api.ts                # API utilities and types
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Authentication Flow

1. **Signup**: Create a new account with name, email, and password
2. **Login**: Sign in with email and password
3. **Dashboard**: Access protected content after authentication
4. **Logout**: Clear session and return to login

### Cookie Management

- Tokens are stored in cookies with a 3-hour expiration
- Cookies are automatically removed on logout
- Cookies expire automatically after 3 hours
- SameSite: Strict for CSRF protection
- Secure flag enabled in production

### Error Handling

The app includes comprehensive error handling:
- Network errors
- API errors with custom messages
- Form validation errors
- Authentication failures

All errors are displayed to users with clear, actionable messages.

## Redux State

### Auth Slice

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

### Actions

- `setCredentials`: Set user and token after login/signup
- `logout`: Clear user data and remove cookie
- `initializeAuth`: Restore auth state from cookie on app load

## Environment Variables

For production, you may want to configure:

```env
NEXT_PUBLIC_API_URL=https://express-api-black-kappa.vercel.app/api/auth
```

## Security Considerations

1. **Token Storage**: Tokens are stored in cookies (can be configured as HTTP-only for enhanced security)
2. **Token Expiration**: Automatic 3-hour expiration
3. **HTTPS**: Secure cookies enabled in production
4. **CSRF Protection**: SameSite cookie attribute
5. **Input Validation**: Client-side validation for all forms

## Customization

### Changing Token Expiration

Edit `src/lib/api.ts`:

```typescript
Cookies.set('token', token, { 
  expires: 3 / 24, // Change this value (in days)
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production'
});
```

### Styling

- Global styles: `src/app/globals.css`
- Auth forms: `src/components/AuthForm.module.css`
- Dashboard: `src/app/dashboard/dashboard.module.css`

### API Configuration

Update API endpoints in `src/lib/api.ts`:

```typescript
const API_BASE_URL = 'your-api-url-here';
```

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

## Author

Built with ❤️ using Next.js 16
