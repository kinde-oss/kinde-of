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
          (function(){
            var CONNECTIONS = {
              google: 'conn_019872d36897cefc0235b3e946560f7f',
              facebook: 'conn_0198a61044542d21e9fa9057f5d14efc',
              email: 'conn_01986aa4b37660f9c12738960ed5b36a'
            };
            const authMethods = ['google','facebook','email'];
            const gridSize = 8;
            let gameGrid = [];
            let revealedAuth = [];

            function init(){
              const field = document.getElementById('msw-field');
              if(!field) return;
              field.innerHTML='';
              gameGrid = [];
              revealedAuth = [];
              updateAuthCount();

              for(let i=0;i<gridSize*gridSize;i++){
                gameGrid.push({revealed:false,isAuth:false,authType:null});
              }

              const positions = [];
              while(positions.length<3){
                const pos = Math.floor(Math.random() * (gridSize*gridSize));
                if(!positions.includes(pos)){
                  positions.push(pos);
                  gameGrid[pos].isAuth = true;
                  gameGrid[pos].authType = authMethods[positions.length-1];
                }
              }

              for(let i=0;i<gridSize*gridSize;i++){
                const btn = document.createElement('button');
                btn.type='button';
                btn.className='msw-cell';
                btn.setAttribute('data-index', String(i));
                btn.addEventListener('click', function(){ reveal(i); });
                field.appendChild(btn);
              }

              document.getElementById('msw-reset')?.addEventListener('click', init, { once: true });
              showOnly('defaultMessage');
            }

            function reveal(index){
              const cell = gameGrid[index];
              if(!cell || cell.revealed) return;
              cell.revealed = true;
              const el = document.querySelector('[data-index="'+index+'"]');
              if(!el) return;
              el.classList.add('revealed');

              if(cell.isAuth){
                el.classList.add('auth');
                if(cell.authType==='google'){ el.innerHTML='📧<br>Google'; showOnly('googleAuth'); }
                if(cell.authType==='facebook'){ el.innerHTML='👥<br>Facebook'; showOnly('facebookAuth'); }
                if(cell.authType==='email'){ el.innerHTML='✉️<br>Email'; showOnly('emailAuth'); }
                if(revealedAuth.indexOf(cell.authType)===-1){ revealedAuth.push(cell.authType); }
              } else {
                const adj = countAdjacent(index);
                if(adj>0){ el.textContent = String(adj); el.style.color = getNumberColor(adj); }
              }
              updateAuthCount();
            }

            function countAdjacent(index){
              const row = Math.floor(index / gridSize);
              const col = index % gridSize;
              let count = 0;
              for(let r=-1;r<=1;r++){
                for(let c=-1;c<=1;c++){
                  const nr = row+r, nc = col+c;
                  if(nr>=0 && nr<gridSize && nc>=0 && nc<gridSize){
                    const ni = nr*gridSize+nc;
                    if(gameGrid[ni].isAuth) count++;
                  }
                }
              }
              return count;
            }

            function getNumberColor(num){
              const colors = ['', 'blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
              return colors[num] || 'black';
            }

            function showOnly(id){
              ['defaultMessage','googleAuth','facebookAuth','emailAuth'].forEach(k=>{
                const el = document.getElementById(k);
                if(!el) return;
                el.style.display = (k===id? 'block' : 'none');
              });
            }

            function updateAuthCount(){
              const el = document.getElementById('msw-auth-count');
              if(el) el.textContent = String(revealedAuth.length);
            }

            function gotoLogin(conn){
              window.location.href = '/api/auth/login?connection_id=' + encodeURIComponent(conn);
            }
            function gotoRegister(conn){
              window.location.href = '/api/auth/register?connection_id=' + encodeURIComponent(conn);
            }

            document.getElementById('msw-google')?.addEventListener('click', function(){ gotoLogin(CONNECTIONS.google); });
            document.getElementById('msw-facebook')?.addEventListener('click', function(){ gotoLogin(CONNECTIONS.facebook); });
            document.getElementById('msw-email-submit')?.addEventListener('click', function(){ gotoLogin(CONNECTIONS.email); });
            document.getElementById('msw-email-create')?.addEventListener('click', function(e){ e.preventDefault(); gotoRegister(CONNECTIONS.email); });

            if(document.readyState==='loading'){
              document.addEventListener('DOMContentLoaded', init);
            } else { init(); }
          })();
        `,
        }}
      />
    </main>
  );
};
