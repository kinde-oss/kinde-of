(function () {
  try {
    console.log('[MSW] ext script start');
  } catch (e) {}
  var CONNECTIONS = {
    google: 'conn_019872d36897cefc0235b3e946560f7f',
    facebook: 'conn_0198a61044542d21e9fa9057f5d14efc',
    email: 'conn_01986aa4b37660f9c12738960ed5b36a',
  };
  var authMethods = ['google', 'facebook', 'email'];
  var gridSize = 8;
  var gameGrid = [];
  var revealedAuth = [];

  function init() {
    console.log('[MSW] init called (ext)');
    var field = document.getElementById('msw-field');
    if (!field) {
      console.warn('[MSW] field not found');
      return;
    }
    field.innerHTML = '';
    gameGrid = [];
    revealedAuth = [];
    updateAuthCount();

    for (var i = 0; i < gridSize * gridSize; i++) {
      gameGrid.push({ revealed: false, isAuth: false, authType: null });
    }

    var positions = [];
    while (positions.length < 3) {
      var pos = Math.floor(Math.random() * (gridSize * gridSize));
      if (positions.indexOf(pos) === -1) {
        positions.push(pos);
        gameGrid[pos].isAuth = true;
        gameGrid[pos].authType = authMethods[positions.length - 1];
      }
    }

    for (var j = 0; j < gridSize * gridSize; j++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'msw-cell';
      btn.setAttribute('data-index', String(j));
      (function (idx) {
        btn.addEventListener('click', function () {
          reveal(idx);
        });
      })(j);
      field.appendChild(btn);
    }

    var resetBtn = document.getElementById('msw-reset');
    if (resetBtn)
      resetBtn.addEventListener(
        'click',
        function () {
          init();
        },
        { once: true }
      );
    showOnly('defaultMessage');
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
      }
      if (cell.authType === 'facebook') {
        el.innerHTML = '👥<br>Facebook';
        showOnly('facebookAuth');
      }
      if (cell.authType === 'email') {
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
        var nr = row + r,
          nc = col + c;
        if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
          var ni = nr * gridSize + nc;
          if (gameGrid[ni].isAuth) count++;
        }
      }
    }
    return count;
  }

  function getNumberColor(num) {
    var colors = [
      '',
      'blue',
      'green',
      'red',
      'purple',
      'maroon',
      'turquoise',
      'black',
      'gray',
    ];
    return colors[num] || 'black';
  }

  function showOnly(id) {
    ['defaultMessage', 'googleAuth', 'facebookAuth', 'emailAuth'].forEach(
      function (k) {
        var el = document.getElementById(k);
        if (!el) return;
        el.style.display = k === id ? 'block' : 'none';
      }
    );
  }

  function updateAuthCount() {
    var el = document.getElementById('msw-auth-count');
    if (el) el.textContent = String(revealedAuth.length);
  }

  function gotoLogin(conn) {
    window.location.href =
      '/api/auth/login?connection_id=' + encodeURIComponent(conn);
  }
  function gotoRegister(conn) {
    window.location.href =
      '/api/auth/register?connection_id=' + encodeURIComponent(conn);
  }

  function wireButtons() {
    var g = document.getElementById('msw-google');
    if (g)
      g.addEventListener('click', function () {
        console.log('[MSW] google login');
        gotoLogin(CONNECTIONS.google);
      });
    var f = document.getElementById('msw-facebook');
    if (f)
      f.addEventListener('click', function () {
        console.log('[MSW] facebook login');
        gotoLogin(CONNECTIONS.facebook);
      });
    var e = document.getElementById('msw-email-submit');
    if (e)
      e.addEventListener('click', function () {
        console.log('[MSW] email login');
        gotoLogin(CONNECTIONS.email);
      });
    var c = document.getElementById('msw-email-create');
    if (c)
      c.addEventListener('click', function (ev) {
        ev.preventDefault();
        console.log('[MSW] email register');
        gotoRegister(CONNECTIONS.email);
      });
  }

  if (document.readyState === 'loading') {
    console.log('[MSW] waiting DOMContentLoaded (ext)');
    document.addEventListener('DOMContentLoaded', function () {
      wireButtons();
      init();
    });
  } else {
    console.log('[MSW] DOM ready, init now (ext)');
    wireButtons();
    init();
  }
})();
