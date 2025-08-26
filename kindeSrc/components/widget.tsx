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

          <div id="msw-auth-buttons">
            <div
              className="msw-oauth email"
              id="msw-email-btn"
              style={{ display: 'none' }}
            >
              <div className="msw-oauth-icon">
                <img src="/images/files/email.png" alt="Email" />
              </div>
              Email
            </div>

            <div
              className="msw-oauth google"
              id="msw-google-btn"
              style={{ display: 'none' }}
            >
              <div className="msw-oauth-icon">
                <img src="/images/files/google.png" alt="Google" />
              </div>
              Google
            </div>

            <div
              className="msw-oauth facebook"
              id="msw-facebook-btn"
              style={{ display: 'none' }}
            >
              <div className="msw-oauth-icon">
                <img src="/images/files/facebook.png" alt="Facebook" />
              </div>
              Facebook
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var gameGrid = [];
              var revealedAuth = [];
              var authMethods = [
                { type: 'google', id: 'conn_019872d36897cefc0235b3e946560f7f' },
                { type: 'facebook', id: 'conn_0198a61044542d21e9fa9057f5d14efc' },
                { type: 'email', id: 'conn_01986aa4b37660f9c12738960ed5b36a' }
              ];
              var gridSize = 8;
              var gameStarted = false;
              var timer = 0;
              var timerInterval = null;
              
              function init() {
                var field = document.getElementById('msw-field');
                if (!field) return;
                
                field.innerHTML = '';
                gameGrid = [];
                revealedAuth = [];
                gameStarted = false;
                timer = 0;
                
                if (timerInterval) {
                  clearInterval(timerInterval);
                  timerInterval = null;
                }
                updateTimer();
                
                // Hide all auth buttons initially
                document.getElementById('msw-start-message').style.display = 'block';
                ['msw-email-btn', 'msw-google-btn', 'msw-facebook-btn'].forEach(function(id) {
                  var el = document.getElementById(id);
                  if (el) el.style.display = 'none';
                });
                
                // Create empty grid
                for (var i = 0; i < gridSize * gridSize; i++) {
                  gameGrid.push({ 
                    revealed: false, 
                    isAuth: false, 
                    authMethod: null,
                    neighborCount: 0
                  });
                }
                
                // Randomly place 3 auth methods
                var positions = [];
                var shuffledMethods = [...authMethods];
                // Shuffle array
                for (var i = shuffledMethods.length - 1; i > 0; i--) {
                  var j = Math.floor(Math.random() * (i + 1));
                  var temp = shuffledMethods[i];
                  shuffledMethods[i] = shuffledMethods[j];
                  shuffledMethods[j] = temp;
                }
                
                for (var m = 0; m < 3; m++) {
                  var pos;
                  do {
                    pos = Math.floor(Math.random() * (gridSize * gridSize));
                  } while (positions.indexOf(pos) !== -1);
                  
                  positions.push(pos);
                  gameGrid[pos].isAuth = true;
                  gameGrid[pos].authMethod = shuffledMethods[m];
                }
                
                // Calculate neighbor counts
                for (var i = 0; i < gridSize * gridSize; i++) {
                  if (!gameGrid[i].isAuth) {
                    gameGrid[i].neighborCount = countAdjacentAuth(i);
                  }
                }
                
                // Create DOM cells - all hidden initially
                for (var j = 0; j < gridSize * gridSize; j++) {
                  var cell = document.createElement('button');
                  cell.className = 'msw-cell';
                  cell.setAttribute('data-index', j);
                  cell.addEventListener('click', function(e) {
                    e.preventDefault();
                    var index = parseInt(this.getAttribute('data-index'));
                    revealCell(index);
                  });
                  field.appendChild(cell);
                }
                
                updateAuthCount();
                updateMinesLeft();
              }
              
              function startGame() {
                if (!gameStarted) {
                  gameStarted = true;
                  timerInterval = setInterval(function() {
                    timer++;
                    updateTimer();
                  }, 1000);
                }
              }
              
              function updateTimer() {
                var timerEl = document.getElementById('msw-timer');
                if (timerEl) {
                  var timeStr = timer.toString().padStart(3, '0');
                  timerEl.textContent = timeStr;
                }
              }
              
              function updateMinesLeft() {
                var minesEl = document.getElementById('msw-mines-left');
                if (minesEl) {
                  var remaining = 3 - revealedAuth.length;
                  minesEl.textContent = remaining.toString().padStart(3, '0');
                }
              }
              
              function revealCell(index) {
                var cell = gameGrid[index];
                if (!cell || cell.revealed) return;
                
                startGame();
                
                cell.revealed = true;
                var cellEl = document.querySelector('[data-index="' + index + '"]');
                if (!cellEl) return;
                
                cellEl.classList.add('revealed');
                cellEl.disabled = true;
                
                if (cell.isAuth) {
                  // Found an auth method
                  cellEl.classList.add('auth');
                  var img = document.createElement('img');
                  img.src = '/images/files/' + cell.authMethod.type + '.png';
                  img.style.width = '20px';
                  img.style.height = '20px';
                  img.style.objectFit = 'contain';
                  cellEl.appendChild(img);
                  
                  if (revealedAuth.indexOf(cell.authMethod.type) === -1) {
                    revealedAuth.push(cell.authMethod.type);
                    showAuthButton(cell.authMethod);
                  }
                } else {
                  // Show number of adjacent auth methods
                  if (cell.neighborCount > 0) {
                    cellEl.textContent = cell.neighborCount;
                    cellEl.style.color = getNumberColor(cell.neighborCount);
                    cellEl.style.fontWeight = 'bold';
                  }
                }
                
                updateAuthCount();
                updateMinesLeft();
                
                // Check if all auth methods found
                if (revealedAuth.length === 3) {
                  if (timerInterval) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                  }
                  document.getElementById('msw-reset').textContent = '😎';
                }
              }
              
              function showAuthButton(authMethod) {
                document.getElementById('msw-start-message').style.display = 'none';
                var btnId = 'msw-' + authMethod.type + '-btn';
                var btn = document.getElementById(btnId);
                if (btn) {
                  btn.style.display = 'flex';
                  // Add click handler to navigate to Kinde
                  btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = '/api/auth/login?connection_id=' + encodeURIComponent(authMethod.id);
                  });
                }
              }
              
              function countAdjacentAuth(index) {
                var row = Math.floor(index / gridSize);
                var col = index % gridSize;
                var count = 0;
                
                for (var r = -1; r <= 1; r++) {
                  for (var c = -1; c <= 1; c++) {
                    if (r === 0 && c === 0) continue;
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
                var colors = ['', '#0000FF', '#008000', '#FF0000', '#800080', '#800000', '#008080', '#000000', '#808080'];
                return colors[num] || '#000000';
              }
              
              function updateAuthCount() {
                var countEl = document.getElementById('msw-auth-count');
                if (countEl) countEl.textContent = revealedAuth.length;
              }
              
              // Reset button
              var resetBtn = document.getElementById('msw-reset');
              if (resetBtn) {
                resetBtn.addEventListener('click', function(e) {
                  e.preventDefault();
                  init();
                });
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
