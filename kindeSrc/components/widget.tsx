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
            Uncover authentication methods to log in
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

      <script
        nonce={props.nonce as any}
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              try { console.log('[MSW] Widget script nonce ok:', (document.currentScript && document.currentScript.nonce)); } catch(e) {}
              
              var CONNECTIONS = {
                google: 'conn_019872d36897cefc0235b3e946560f7f',
                facebook: 'conn_0198a61044542d21e9fa9057f5d14efc',
                email: 'conn_01986aa4b37660f9c12738960ed5b36a'
              };
              
              var authMethods = ['google', 'facebook', 'email'];
              var gridSize = 8;
              var gameGrid = [];
              var revealedAuth = [];

              function init() {
                console.log('[MSW] Initializing game...');
                var field = document.getElementById('msw-field');
                if (!field) {
                  console.error('[MSW] Field element not found');
                  return;
                }
                
                field.innerHTML = '';
                gameGrid = [];
                revealedAuth = [];
                updateAuthCount();

                // Initialize grid
                for (var i = 0; i < gridSize * gridSize; i++) {
                  gameGrid.push({ revealed: false, isAuth: false, authType: null });
                }

                // Place auth methods randomly
                var positions = [];
                while (positions.length < 3) {
                  var pos = Math.floor(Math.random() * (gridSize * gridSize));
                  if (positions.indexOf(pos) === -1) {
                    positions.push(pos);
                    gameGrid[pos].isAuth = true;
                    gameGrid[pos].authType = authMethods[positions.length - 1];
                  }
                }

                // Create DOM elements
                for (var j = 0; j < gridSize * gridSize; j++) {
                  var btn = document.createElement('button');
                  btn.type = 'button';
                  btn.className = 'msw-cell';
                  btn.setAttribute('data-index', String(j));
                  
                  // Use closure to capture index
                  (function(idx) {
                    btn.addEventListener('click', function() { reveal(idx); });
                  })(j);
                  
                  field.appendChild(btn);
                }

                // Wire reset button
                var resetBtn = document.getElementById('msw-reset');
                if (resetBtn) {
                  resetBtn.addEventListener('click', function() {
                    console.log('[MSW] Resetting game...');
                    init();
                  });
                }

                showOnly('defaultMessage');
                console.log('[MSW] Game initialized successfully');
              }

              function reveal(index) {
                var cell = gameGrid[index];
                if (!cell || cell.revealed) return;
                
                cell.revealed = true;
                var el = document.querySelector('[data-index="' + index + '"]');
                if (!el) return;
                
                el.classList.add('revealed');

                if (cell.isAuth) {
                  el.classList.add('auth');
                  
                  if (cell.authType === 'google') {
                    el.innerHTML = '📧<br>Google';
                    showOnly('googleAuth');
                  } else if (cell.authType === 'facebook') {
                    el.innerHTML = '👥<br>Facebook';
                    showOnly('facebookAuth');
                  } else if (cell.authType === 'email') {
                    el.innerHTML = '✉️<br>Email';
                    showOnly('emailAuth');
                  }
                  
                  if (revealedAuth.indexOf(cell.authType) === -1) {
                    revealedAuth.push(cell.authType);
                  }
                } else {
                  var adj = countAdjacent(index);
                  if (adj > 0) {
                    el.textContent = String(adj);
                    el.style.color = getNumberColor(adj);
                  }
                }
                
                updateAuthCount();
              }

              function countAdjacent(index) {
                var row = Math.floor(index / gridSize);
                var col = index % gridSize;
                var count = 0;
                
                for (var r = -1; r <= 1; r++) {
                  for (var c = -1; c <= 1; c++) {
                    var nr = row + r, nc = col + c;
                    if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
                      var ni = nr * gridSize + nc;
                      if (gameGrid[ni].isAuth) count++;
                    }
                  }
                }
                return count;
              }

              function getNumberColor(num) {
                var colors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
                return colors[num] || 'black';
              }

              function showOnly(id) {
                ['defaultMessage', 'googleAuth', 'facebookAuth', 'emailAuth'].forEach(function(k) {
                  var el = document.getElementById(k);
                  if (!el) return;
                  el.style.display = (k === id ? 'block' : 'none');
                });
              }

              function updateAuthCount() {
                var el = document.getElementById('msw-auth-count');
                if (el) el.textContent = String(revealedAuth.length);
              }

              function gotoLogin(conn) {
                console.log('[MSW] Navigating to login with connection:', conn);
                window.location.href = '/api/auth/login?connection_id=' + encodeURIComponent(conn);
              }

              function gotoRegister(conn) {
                console.log('[MSW] Navigating to register with connection:', conn);
                window.location.href = '/api/auth/register?connection_id=' + encodeURIComponent(conn);
              }

              function wireButtons() {
                console.log('[MSW] Wiring auth buttons...');
                
                var googleBtn = document.getElementById('msw-google');
                if (googleBtn) {
                  googleBtn.addEventListener('click', function() {
                    gotoLogin(CONNECTIONS.google);
                  });
                }

                var facebookBtn = document.getElementById('msw-facebook');
                if (facebookBtn) {
                  facebookBtn.addEventListener('click', function() {
                    gotoLogin(CONNECTIONS.facebook);
                  });
                }

                var emailSubmit = document.getElementById('msw-email-submit');
                if (emailSubmit) {
                  emailSubmit.addEventListener('click', function() {
                    gotoLogin(CONNECTIONS.email);
                  });
                }

                var emailCreate = document.getElementById('msw-email-create');
                if (emailCreate) {
                  emailCreate.addEventListener('click', function(ev) {
                    ev.preventDefault();
                    gotoRegister(CONNECTIONS.email);
                  });
                }
                
                console.log('[MSW] Auth buttons wired successfully');
              }

              // Initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  console.log('[MSW] DOM loaded, starting initialization...');
                  wireButtons();
                  init();
                });
              } else {
                console.log('[MSW] DOM already ready, starting initialization...');
                wireButtons();
                init();
              }
            })();
          `,
        }}
      />
    </main>
  );
};
