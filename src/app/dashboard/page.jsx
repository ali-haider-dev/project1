'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/authSlice';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // Redirect to auth if not authenticated
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth');
  };

  // Only show nothing if not authenticated AND no user data
  // This prevents white screen when user data exists
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated but no user data yet, show loading or return null
  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Dashboard</h1>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <svg className={styles.logoutIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeHeader}>
              <div className={styles.avatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className={styles.welcomeTitle}>Welcome back, {user.name}!</h2>
                <p className={styles.welcomeSubtitle}>You&apos;re successfully logged in</p>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Profile</h3>
              <div className={styles.cardContent}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Name:</span>
                  <span className={styles.infoValue}>{user.name}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Email:</span>
                  <span className={styles.infoValue}>{user.email}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Role:</span>
                  <span className={styles.roleBadge}>{user.role}</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Security</h3>
              <div className={styles.cardContent}>
                <p className={styles.securityText}>
                  Your session is secured with JWT authentication and will automatically expire after 3 hours.
                </p>
                <div className={styles.securityBadge}>
                  <svg className={styles.checkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Authenticated
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Quick Actions</h3>
              <div className={styles.cardContent}>
                <button className={styles.actionButton}>Update Profile</button>
                <button className={styles.actionButton}>Change Password</button>
                <button className={styles.actionButton}>View Settings</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
