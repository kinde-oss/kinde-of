'use server';
// @ts-nocheck

import React from 'react';

const styles: {
  heading: React.CSSProperties;
  description: React.CSSProperties;
} = {
  heading: {
    alignSelf: 'stretch',
    color: '#F5F5F5',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px',
    letterSpacing: '-0.64px',
    textAlign: 'center',
  },
  description: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
};

export const Widget = (props: {
  heading: string;
  description: string;
  nonce?: string;
}) => {
  return (
    <main className="login-form">
      <div className="xp-window">
        <div className="xp-titlebar">Login</div>
        <div className="xp-content">
          <div className="xp-statusbar">
            <div className="xp-counter" id="xp-mines-left">
              000
            </div>
            <button className="xp-smiley" id="xp-reset" aria-label="Restart">
              🙂
            </button>
            <div className="xp-counter" id="xp-timer">
              000
            </div>
          </div>

          <div className="xp-split">
            <div>
              <div id="minesweeper-root" className="xp-board" />
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button className="xp-button" id="xp-restart">
                  Play Again
                </button>
              </div>
            </div>
            <div className="xp-panel">
              <div className="xp-panel-title">Sign in options</div>
              <div id="xp-options" className="xp-options"></div>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.__MSW_PROVIDERS__ = [
        { key: 'google', label: 'Google', connectionId: 'conn_019872d36897cefc0235b3e946560f7f' },
        { key: 'microsoft', label: 'Microsoft', connectionId: 'conn_0198a61044542d21e9fa9057f5d14efc' },
        { key: 'email', label: 'Email', connectionId: 'conn_01986aa4b37660f9c12738960ed5b36a' }
      ];`,
        }}
      />
      <script src="/msw-login.js" defer />
    </main>
  );
};
