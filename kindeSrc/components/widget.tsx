'use server';
// @ts-nocheck

import React from 'react';

export const Widget = (props: {
  heading: string;
  description: string;
  nonce?: string;
}) => {
  return (
    <main className="login-form">
      <div className="msw-login-container">
        <div className="msw-left">
          <div className="msw-subtitle">
            Uncover authentication methods to log in1
          </div>

          <div className="msw-game">
            <div className="msw-game-header">
              <div className="msw-counter">003</div>
              <button className="msw-reset" id="msw-reset" aria-label="Restart">
                🙂
              </button>
              <div className="msw-counter">000</div>
            </div>

            <div className="msw-field" id="msw-field" role="grid" />
          </div>

          <div className="msw-found">
            Authentication methods found: <span id="msw-auth-count">0</span>/3
          </div>
        </div>

        <div className="msw-right">
          <div className="msw-welcome">Welcome to Windows</div>
          <div className="msw-instructions">
            Click on the minesweeper tiles to reveal authentication methods.
            <br />
            Each method you uncover will appear here for login.
          </div>

          <div className="msw-panel">
            <div id="defaultMessage" className="msw-auth active">
              <div className="msw-auth-title">🎯 Start Playing Minesweeper</div>
              <p className="msw-muted">
                Uncover tiles on the left to reveal login options
              </p>
            </div>

            <div
              id="googleAuth"
              className="msw-auth"
              style={{ display: 'none' }}
            >
              <div className="msw-auth-title">🔍 Google Authentication</div>
              <button className="msw-oauth google" id="msw-google">
                📧 Sign in with Google
              </button>
              <p className="msw-hint">
                Secure OAuth2 authentication via Google
              </p>
            </div>

            <div
              id="facebookAuth"
              className="msw-auth"
              style={{ display: 'none' }}
            >
              <div className="msw-auth-title">📘 Facebook Authentication</div>
              <button className="msw-oauth facebook" id="msw-facebook">
                👥 Sign in with Facebook
              </button>
              <p className="msw-hint">Connect using your Facebook account</p>
            </div>

            <div
              id="emailAuth"
              className="msw-auth"
              style={{ display: 'none' }}
            >
              <div className="msw-auth-title">✉️ Email Authentication</div>
              <div className="msw-email-form">
                <div className="msw-fieldset">
                  <label>Email address:</label>
                  <input type="email" placeholder="user@example.com" />
                </div>
                <div className="msw-fieldset">
                  <label>Password:</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button className="msw-submit" id="msw-email-submit">
                  Log in
                </button>
                <div className="msw-center">
                  <a className="msw-link" id="msw-email-create" href="#">
                    Create new account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="/msw-y2k.js" defer />
    </main>
  );
};
