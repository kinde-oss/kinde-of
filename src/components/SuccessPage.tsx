import React, { useEffect, useState } from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { LogoutLink, PortalLink } from '@kinde-oss/kinde-auth-react/components';
import './SuccessPage.css';

export default function SuccessPage() {
  const { user } = useKindeAuth();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 3 + 2 + 's',
                backgroundColor: ['#4ade80', '#22c55e', '#16a34a', '#15803d'][
                  Math.floor(Math.random() * 4)
                ],
              }}
            />
          ))}
        </div>
      )}

      <header>
        <nav className="nav container">
          <h1 className="text-display-3">🎉 Vibe Verified!</h1>
          <div className="profile-blob">
            {user?.picture !== '' ? (
              <img
                className="avatar"
                src={user?.picture}
                alt="user profile avatar"
              />
            ) : (
              <div className="avatar">
                {user?.givenName?.[0]}
                {user?.familyName?.[1]}
              </div>
            )}
            <div>
              <p className="text-heading-2">
                {user?.givenName} {user?.familyName}
              </p>
              <ul className="c-user-menu">
                <li>
                  <PortalLink>Account</PortalLink>
                </li>
                <li>
                  <LogoutLink className="text-subtle">Sign out</LogoutLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container">
          <div className="success-hero">
            <div className="success-icon">✨</div>
            <h1 className="text-display-2 success-title">Woohoo!</h1>
            <p className="text-body-1 success-subtitle">
              Dashboard privileges restored.
            </p>
            <div className="success-stats">
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Vibe Score</span>
              </div>
              <div className="stat">
                <span className="stat-number">🎯</span>
                <span className="stat-label">Target Hit</span>
              </div>
              <div className="stat">
                <span className="stat-number">🚀</span>
                <span className="stat-label">Ready to Go</span>
              </div>
            </div>
          </div>

          <section className="dashboard-section">
            <h2 className="text-heading-1">Your Dashboard</h2>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Analytics</h3>
                <p>View your performance metrics and insights.</p>
                <button className="card-button">View Analytics</button>
              </div>
              <div className="dashboard-card">
                <h3>Projects</h3>
                <p>Manage your active projects and tasks.</p>
                <button className="card-button">Manage Projects</button>
              </div>
              <div className="dashboard-card">
                <h3>Settings</h3>
                <p>Configure your account and preferences.</p>
                <button className="card-button">Open Settings</button>
              </div>
              <div className="dashboard-card">
                <h3>Support</h3>
                <p>Get help and contact support team.</p>
                <button className="card-button">Contact Support</button>
              </div>
              <div className="dashboard-card">
                <h3>Reset Video Paywall</h3>
                <p>For testing: Reset the video paywall to watch again.</p>
                <button
                  className="card-button"
                  onClick={() => {
                    const keys = Object.keys(sessionStorage);
                    keys.forEach(key => {
                      if (key.startsWith('videoWatched_')) {
                        sessionStorage.removeItem(key);
                      }
                    });
                    window.location.reload();
                  }}
                >
                  Reset Video Paywall
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <strong className="text-heading-2">KindeAuth</strong>
          <p className="footer-tagline text-body-3">
            Visit our{' '}
            <a className="link" href="https://kinde.com/docs">
              help center
            </a>
          </p>

          <small className="text-subtle">
            © 2023 KindeAuth, Inc. All rights reserved
          </small>
        </div>
      </footer>
    </>
  );
}
