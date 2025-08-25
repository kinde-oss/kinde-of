'use server';

import React from 'react';

type WidgetProps = {
  heading: string;
  description: string;
  nonce?: string;
  requestUrl?: string;
};

export const Widget: React.FC<WidgetProps> = (props) => {
  return (
    <main className="login-form">
      <div className="msw-login-container">
        <div className="msw-left">
          <div className="msw-subtitle">Choose your authentication method</div>

          <div className="msw-game">
            <div className="msw-game-header">
              <div className="msw-counter">003</div>
              <div className="msw-reset">🎯</div>
              <div className="msw-counter">000</div>
            </div>

            <div className="msw-field-static">
              <div className="msw-cell revealed auth">
                📧
                <br />
                Google
              </div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed auth">
                👥
                <br />
                Facebook
              </div>
              <div className="msw-cell revealed">2</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">2</div>
              <div className="msw-cell revealed">2</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">2</div>
              <div className="msw-cell revealed auth">
                ✉️
                <br />
                Email
              </div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">1</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
              <div className="msw-cell revealed">0</div>
            </div>
          </div>

          <div className="msw-found">Authentication methods found: 3/3</div>
        </div>

        <div className="msw-right">
          <div className="msw-welcome">Welcome to Windows</div>
          <div className="msw-instructions">
            All authentication methods have been revealed!
            <br />
            Choose your preferred login method below.
          </div>

          <div className="msw-panel">
            <div className="msw-auth active">
              <div className="msw-auth-title">🔍 Google Authentication</div>
              <a
                href="/api/auth/login?connection_id=conn_019872d36897cefc0235b3e946560f7f"
                className="msw-oauth google"
              >
                📧 Sign in with Google
              </a>
              <p className="msw-hint">
                Secure OAuth2 authentication via Google
              </p>
            </div>

            <div className="msw-auth active">
              <div className="msw-auth-title">📘 Facebook Authentication</div>
              <a
                href="/api/auth/login?connection_id=conn_0198a61044542d21e9fa9057f5d14efc"
                className="msw-oauth facebook"
              >
                👥 Sign in with Facebook
              </a>
              <p className="msw-hint">Connect using your Facebook account</p>
            </div>

            <div className="msw-auth active">
              <div className="msw-auth-title">✉️ Email Authentication</div>
              <div className="msw-email-form">
                <form action="/api/auth/login" method="get">
                  <input
                    type="hidden"
                    name="connection_id"
                    value="conn_01986aa4b37660f9c12738960ed5b36a"
                  />
                  <div className="msw-fieldset">
                    <label>Email address:</label>
                    <input
                      type="email"
                      name="login_hint"
                      placeholder="user@example.com"
                    />
                  </div>
                  <button type="submit" className="msw-submit">
                    Log in with Email
                  </button>
                </form>
                <div className="msw-center">
                  <a
                    className="msw-link"
                    href="/api/auth/register?connection_id=conn_01986aa4b37660f9c12738960ed5b36a"
                  >
                    Create new account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
