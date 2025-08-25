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
        nonce={props.nonce as any}
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const BOARD_SIZE = 4;
  const PROVIDERS = [
    { key: 'google', label: 'Google', connectionId: 'conn_019872d36897cefc0235b3e946560f7f' },
    { key: 'microsoft', label: 'Microsoft', connectionId: 'conn_0198a61044542d21e9fa9057f5d14efc' },
    { key: 'email', label: 'Email', connectionId: 'conn_01986aa4b37660f9c12738960ed5b36a' }
  ];

  // If you add or remove providers, the game adapts automatically
  const $root = document.getElementById('minesweeper-root');
  const $restart = document.getElementById('xp-restart');
  const $resetTop = document.getElementById('xp-reset');
  const $mines = document.getElementById('xp-mines-left');
  const $timer = document.getElementById('xp-timer');
  const $options = document.getElementById('xp-options');

  let board = [];
  let revealed = new Set();
  let seenProviders = new Set();
  let timerId = null;
  let startAt = 0;

  function index(r, c) { return r * BOARD_SIZE + c; }

  function neighbors(r, c) {
    const coords = [];
    for (let dr=-1; dr<=1; dr++) {
      for (let dc=-1; dc<=1; dc++) {
        if (dr===0 && dc===0) continue;
        const nr = r + dr, nc = c + dc;
        if (nr>=0 && nr<BOARD_SIZE && nc>=0 && nc<BOARD_SIZE) coords.push([nr, nc]);
      }
    }
    return coords;
  }

  function placeProviders() {
    const size = BOARD_SIZE * BOARD_SIZE;
    const spots = Array.from({ length: size }, (_, i) => i);
    for (let i=spots.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [spots[i], spots[j]] = [spots[j], spots[i]];
    }
    const used = spots.slice(0, PROVIDERS.length);
    const map = new Map();
    PROVIDERS.forEach((p, i) => map.set(used[i], p));
    return map; // key: cellIndex, value: provider
  }

  function computeBoard() {
    const providerMap = placeProviders();
    const grid = [];
    for (let r=0; r<BOARD_SIZE; r++) {
      for (let c=0; c<BOARD_SIZE; c++) {
        const i = index(r, c);
        if (providerMap.has(i)) {
          grid[i] = { type: 'provider', provider: providerMap.get(i) };
        } else {
          // count adjacent providers
          const count = neighbors(r,c).reduce((acc, [nr, nc]) => {
            const ni = index(nr, nc);
            return acc + (providerMap.has(ni) ? 1 : 0);
          }, 0);
          grid[i] = { type: 'empty', count };
        }
      }
    }
    return grid;
  }

  function pad3(n) {
    n = Math.max(0, Math.min(999, n|0));
    return String(n).padStart(3, '0');
  }

  function setMinesLeft(n) { if ($mines) $mines.textContent = pad3(n); }
  function setTimer(n) { if ($timer) $timer.textContent = pad3(n); }

  function startTimer() {
    if (timerId) clearInterval(timerId);
    startAt = Date.now();
    setTimer(0);
    timerId = setInterval(() => {
      const sec = Math.floor((Date.now() - startAt) / 1000);
      setTimer(sec);
    }, 1000);
  }

  function cellHTML(i) {
    return '<button class="xp-cell" data-i="'+i+'" aria-label="cell"></button>';
  }

  function draw() {
    const cells = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => cellHTML(i)).join('');
    $root.innerHTML = cells;
  }

  function colorForNumber(n) {
    const colors = ['#0000FF','#008200','#FF0000','#000084','#840000','#008284','#840084','#000000'];
    return colors[Math.max(0, Math.min(n-1, colors.length-1))];
  }

  function revealCell(i) {
    if (revealed.has(i)) return;
    revealed.add(i);
    const cell = board[i];
    const el = $root.querySelector('[data-i="'+i+'"]');
    if (!el) return;
    el.classList.add('xp-cell-open');
    if (cell.type === 'provider') {
      const p = cell.provider;
      el.innerHTML = '<div class="xp-provider">'
        + providerLogoSVG(p.key)
        + '<div class="xp-provider-name">' + p.label + '</div>'
        + '<button class="xp-button xp-provider-btn" data-login="' + p.connectionId + '">Login with ' + p.label + '</button>'
        + '</div>';
      addOption(p);
    } else {
      if (cell.count > 0) {
        el.innerHTML = '<span class="xp-num" style="color:'+colorForNumber(cell.count)+'">'+cell.count+'</span>';
      } else {
        // flood fill open for blanks
        const queue = [i];
        while (queue.length) {
          const ci = queue.shift();
          const r = Math.floor(ci / BOARD_SIZE), c = ci % BOARD_SIZE;
          neighbors(r,c).forEach(([nr,nc]) => {
            const ni = nr*BOARD_SIZE + nc;
            if (revealed.has(ni)) return;
            const ce = board[ni];
            const eln = $root.querySelector('[data-i="'+ni+'"]');
            if (!eln) return;
            revealed.add(ni);
            eln.classList.add('xp-cell-open');
            if (ce.type === 'empty' && ce.count === 0) {
              queue.push(ni);
            } else if (ce.type === 'empty' && ce.count > 0) {
              eln.innerHTML = '<span class="xp-num" style="color:'+colorForNumber(ce.count)+'">'+ce.count+'</span>';
            }
          });
        }
      }
    }
  }

  function providerLogoSVG(key) {
    if (key === 'google') {
      return '
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">\
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36 16.8 36 11 30.2 11 23S16.8 10 24 10c3.6 0 6.8 1.4 9.2 3.7l5.7-5.7C35.4 4.4 30 2 24 2 11.9 2 2 11.9 2 24s9.9 22 22 22c11 0 21-8 21-22 0-1.2-.1-2.3-.4-3.5z"/>\
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.3 15.6 18.8 12 24 12c3.6 0 6.8 1.4 9.2 3.7l5.7-5.7C35.4 4.4 30 2 24 2 15 2 7.5 7.1 6.3 14.7z"/>\
          <path fill="#4CAF50" d="M24 46c5.2 0 10-1.9 13.6-5.1l-6.3-5.2C29.1 37.9 26.7 38.8 24 38.8 18.8 38.8 14.3 35.2 12.9 30l-6.6 5.1C7.5 40.9 15 46 24 46z"/>\
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.6 29.3 36 24 36c-5.2 0-9.7-3.6-11.1-8.8l-6.6 5.1C7.5 40.9 15 46 24 46c11 0 21-8 21-22 0-1.2-.1-2.3-.4-3.5z"/>\
        </svg>';
    }
    if (key === 'microsoft') {
      return '
        <span class="xp-ms">\
          <span style="background:#f25022"></span>\
          <span style="background:#7fba00"></span>\
          <span style="background:#00a4ef"></span>\
          <span style="background:#ffb900"></span>\
        </span>';
    }
    if (key === 'email') {
      return '<span class="xp-email">✉️</span>';
    }
    return '';
  }

  function addOption(p) {
    if (seenProviders.has(p.key)) return;
    seenProviders.add(p.key);
    if (!$options) return;
    const item = document.createElement('div');
    item.className = 'xp-option';
    item.innerHTML = (
      providerLogoSVG(p.key)
      + '<div class="xp-option-name">' + p.label + '</div>'
      + '<button class="xp-button xp-provider-btn" data-login="' + p.connectionId + '">Login with ' + p.label + '</button>'
    );
    $options.appendChild(item);
  }

  function attachHandlers() {
    $root.addEventListener('click', (e) => {
      const target = e.target.closest('.xp-cell');
      if (!target) return;
      const i = Number(target.getAttribute('data-i'));
      revealCell(i);
    });

    $root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-login]');
      if (!btn) return;
      const connectionId = btn.getAttribute('data-login');
      if (window.login) {
        window.login({ connectionId });
      } else {
        // Fallback for local dev: attempt known Next.js route
        window.location.href = '/api/auth/login?connection_id=' + encodeURIComponent(connectionId);
      }
    });

    function restart() { init(); }
    $restart.addEventListener('click', restart);
    $resetTop.addEventListener('click', restart);
  }

  function init() {
    board = computeBoard();
    revealed = new Set();
    seenProviders = new Set();
    draw();
    setMinesLeft(PROVIDERS.length);
    setTimer(0);
    if ($options) $options.innerHTML = '';
    startTimer();
  }

  attachHandlers();
  init();
})();
          `,
        }}
      />
    </main>
  );
};
