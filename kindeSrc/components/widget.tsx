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
              <div className="msw-counter" id="msw-mines-left">
                003
              </div>
              <button className="msw-reset" id="msw-reset">
                😊
              </button>
              <div className="msw-counter" id="msw-timer">
                000
              </div>
            </div>

            <div className="msw-field" id="msw-field"></div>
          </div>

          <div className="msw-found">
            Authentication methods found: <span id="msw-auth-count">0</span>/3
          </div>
        </div>

        <div className="msw-right">
          <div id="msw-start-message" className="msw-start-msg">
            <p>To begin, uncover a login method</p>
          </div>

          <div id="msw-auth-buttons" style={{ display: 'none' }}>
            <a
              href="/api/auth/login?connection_id=conn_01986aa4b37660f9c12738960ed5b36a"
              className="msw-oauth email"
              id="msw-email-btn"
              style={{ display: 'none' }}
            >
              <div className="msw-oauth-icon">✉️</div>
              Email
            </a>

            <a
              href="/api/auth/login?connection_id=conn_019872d36897cefc0235b3e946560f7f"
              className="msw-oauth google"
              id="msw-google-btn"
              style={{ display: 'none' }}
            >
              <div className="msw-oauth-icon">G</div>
              Google
            </a>

            <a
              href="/api/auth/login?connection_id=conn_0198a61044542d21e9fa9057f5d14efc"
              className="msw-oauth facebook"
              id="msw-facebook-btn"
              style={{ display: 'none' }}
            >
              <div className="msw-oauth-icon">f</div>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Simple game script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var gameGrid = [];
              var revealedAuth = [];
              var authMethods = ['google', 'facebook', 'email'];
              var gridSize = 8;
              
              function init() {
                var field = document.getElementById('msw-field');
                if (!field) return;
                
                field.innerHTML = '';
                gameGrid = [];
                revealedAuth = [];
                
                // Hide all auth buttons initially
                document.getElementById('msw-start-message').style.display = 'block';
                document.getElementById('msw-auth-buttons').style.display = 'none';
                ['msw-email-btn', 'msw-google-btn', 'msw-facebook-btn'].forEach(function(id) {
                  var el = document.getElementById(id);
                  if (el) el.style.display = 'none';
                });
                
                // Create grid
                for (var i = 0; i < gridSize * gridSize; i++) {
                  gameGrid.push({ revealed: false, isAuth: false, authType: null });
                }
                
                // Place 3 auth methods
                var positions = [];
                while (positions.length < 3) {
                  var pos = Math.floor(Math.random() * (gridSize * gridSize));
                  if (positions.indexOf(pos) === -1) {
                    positions.push(pos);
                    gameGrid[pos].isAuth = true;
                    gameGrid[pos].authType = authMethods[positions.length - 1];
                  }
                }
                
                // Create DOM cells
                for (var j = 0; j < gridSize * gridSize; j++) {
                  var cell = document.createElement('div');
                  cell.className = 'msw-cell';
                  cell.setAttribute('data-index', j);
                  cell.addEventListener('click', function() {
                    revealCell(parseInt(this.getAttribute('data-index')));
                  });
                  field.appendChild(cell);
                }
                
                updateAuthCount();
              }
              
              function revealCell(index) {
                var cell = gameGrid[index];
                if (!cell || cell.revealed) return;
                
                cell.revealed = true;
                var cellEl = document.querySelector('[data-index="' + index + '"]');
                if (!cellEl) return;
                
                cellEl.classList.add('revealed');
                
                if (cell.isAuth) {
                  cellEl.classList.add('auth');
                  
                  if (cell.authType === 'google') {
                    cellEl.innerHTML = 'Google';
                    showAuthButton('msw-google-btn');
                  } else if (cell.authType === 'facebook') {
                    cellEl.innerHTML = 'Facebook';  
                    showAuthButton('msw-facebook-btn');
                  } else if (cell.authType === 'email') {
                    cellEl.innerHTML = 'Email';
                    showAuthButton('msw-email-btn');
                  }
                  
                  if (revealedAuth.indexOf(cell.authType) === -1) {
                    revealedAuth.push(cell.authType);
                  }
                } else {
                  var adjacent = countAdjacent(index);
                  if (adjacent > 0) {
                    cellEl.textContent = adjacent;
                    cellEl.style.color = getNumberColor(adjacent);
                  }
                }
                
                updateAuthCount();
              }
              
              function showAuthButton(btnId) {
                document.getElementById('msw-start-message').style.display = 'none';
                document.getElementById('msw-auth-buttons').style.display = 'block';
                var btn = document.getElementById(btnId);
                if (btn) btn.style.display = 'flex';
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
                      if (gameGrid[ni] && gameGrid[ni].isAuth) count++;
                    }
                  }
                }
                return count;
              }
              
              function getNumberColor(num) {
                var colors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
                return colors[num] || 'black';
              }
              
              function updateAuthCount() {
                var countEl = document.getElementById('msw-auth-count');
                if (countEl) countEl.textContent = revealedAuth.length;
              }
              
              // Reset button
              var resetBtn = document.getElementById('msw-reset');
              if (resetBtn) {
                resetBtn.addEventListener('click', init);
              }
              
              // Start game when DOM ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
              } else {
                init();
              }
            })();
          `,
        }}
      />
    </main>
  );
};
