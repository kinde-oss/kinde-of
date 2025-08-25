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
          <a
            href="/api/auth/login?connection_id=conn_01986aa4b37660f9c12738960ed5b36a"
            className="msw-oauth email"
          >
            <div className="msw-oauth-icon">✉️</div>
            Email
          </a>

          <a
            href="/api/auth/login?connection_id=conn_019872d36897cefc0235b3e946560f7f"
            className="msw-oauth google"
          >
            <div className="msw-oauth-icon">G</div>
            Google
          </a>

          <a
            href="/api/auth/login?connection_id=conn_0198a61044542d21e9fa9057f5d14efc"
            className="msw-oauth facebook"
          >
            <div className="msw-oauth-icon">f</div>
            Facebook
          </a>
        </div>
      </div>
    </main>
  );
};
