(function () {
  var BOARD_SIZE = 4;
  var PROVIDERS = window.__MSW_PROVIDERS__ || [
    {
      key: 'google',
      label: 'Google',
      connectionId: 'conn_019872d36897cefc0235b3e946560f7f',
    },
    {
      key: 'facebook',
      label: 'Facebook',
      connectionId: 'conn_0198a61044542d21e9fa9057f5d14efc',
    },
    {
      key: 'email',
      label: 'Email',
      connectionId: 'conn_01986aa4b37660f9c12738960ed5b36a',
    },
  ];

  var $root = document.getElementById('minesweeper-root');
  var $restart = document.getElementById('xp-restart');
  var $resetTop = document.getElementById('xp-reset');
  var $mines = document.getElementById('xp-mines-left');
  var $timer = document.getElementById('xp-timer');
  var $options = document.getElementById('xp-options');

  var board = [];
  var revealed = new Set();
  var seenProviders = new Set();
  var timerId = null;
  var startAt = 0;

  function index(r, c) {
    return r * BOARD_SIZE + c;
  }

  function neighbors(r, c) {
    var coords = [];
    for (var dr = -1; dr <= 1; dr++) {
      for (var dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        var nr = r + dr,
          nc = c + dc;
        if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
          coords.push([nr, nc]);
        }
      }
    }
    return coords;
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function placeProviders() {
    var size = BOARD_SIZE * BOARD_SIZE;
    var spots = shuffle(
      Array.from({ length: size }, function (_, i) {
        return i;
      })
    );
    var used = spots.slice(0, PROVIDERS.length);
    var map = new Map();
    PROVIDERS.forEach(function (p, i) {
      map.set(used[i], p);
    });
    return map;
  }

  function computeBoard() {
    var providerMap = placeProviders();
    var grid = [];
    for (var r = 0; r < BOARD_SIZE; r++) {
      for (var c = 0; c < BOARD_SIZE; c++) {
        var i = index(r, c);
        if (providerMap.has(i)) {
          grid[i] = { type: 'provider', provider: providerMap.get(i) };
        } else {
          var count = neighbors(r, c).reduce(function (acc, rc) {
            var nr = rc[0],
              nc = rc[1];
            var ni = index(nr, nc);
            return acc + (providerMap.has(ni) ? 1 : 0);
          }, 0);
          grid[i] = { type: 'empty', count: count };
        }
      }
    }
    return grid;
  }

  function pad3(n) {
    n = Math.max(0, Math.min(999, n | 0));
    return String(n).padStart(3, '0');
  }

  function setMinesLeft(n) {
    if ($mines) $mines.textContent = pad3(n);
  }

  function setTimer(n) {
    if ($timer) $timer.textContent = pad3(n);
  }

  function startTimer() {
    if (timerId) clearInterval(timerId);
    startAt = Date.now();
    setTimer(0);
    timerId = setInterval(function () {
      setTimer(Math.floor((Date.now() - startAt) / 1000));
    }, 1000);
  }

  function cellHTML(i) {
    return (
      '<button class="xp-cell" data-i="' + i + '" aria-label="cell"></button>'
    );
  }

  function draw() {
    if (!$root) return;
    $root.innerHTML = Array.from(
      { length: BOARD_SIZE * BOARD_SIZE },
      function (_, i) {
        return cellHTML(i);
      }
    ).join('');
  }

  function colorForNumber(n) {
    var colors = [
      '#0000FF',
      '#008200',
      '#FF0000',
      '#000084',
      '#840000',
      '#008284',
      '#840084',
      '#000000',
    ];
    return colors[Math.max(0, Math.min(n - 1, colors.length - 1))];
  }

  function revealCell(i) {
    if (revealed.has(i)) return;
    revealed.add(i);
    var cell = board[i];
    var el = $root.querySelector('[data-i="' + i + '"]');
    if (!el) return;

    el.classList.add('xp-cell-open');

    if (cell.type === 'provider') {
      var p = cell.provider;
      el.innerHTML =
        '<div class="xp-provider">' +
        providerLogoSVG(p.key) +
        '<div class="xp-provider-name">' +
        p.label +
        '</div>' +
        '<button class="xp-button xp-provider-btn" data-login="' +
        p.connectionId +
        '">Login with ' +
        p.label +
        '</button>' +
        '</div>';
      addOption(p);
      setMinesLeft(PROVIDERS.length - seenProviders.size);
    } else if (cell.count > 0) {
      el.innerHTML =
        '<span class="xp-num" style="color:' +
        colorForNumber(cell.count) +
        '">' +
        cell.count +
        '</span>';
    } else {
      // Flood fill for empty cells
      var queue = [i];
      while (queue.length) {
        var ci = queue.shift();
        var r = Math.floor(ci / BOARD_SIZE),
          c = ci % BOARD_SIZE;
        neighbors(r, c).forEach(function (rc) {
          var nr = rc[0],
            nc = rc[1];
          var ni = nr * BOARD_SIZE + nc;
          if (revealed.has(ni)) return;
          var ce = board[ni];
          var eln = $root.querySelector('[data-i="' + ni + '"]');
          if (!eln) return;

          revealed.add(ni);
          eln.classList.add('xp-cell-open');

          if (ce.type === 'empty' && ce.count === 0) {
            queue.push(ni);
          } else if (ce.type === 'empty' && ce.count > 0) {
            eln.innerHTML =
              '<span class="xp-num" style="color:' +
              colorForNumber(ce.count) +
              '">' +
              ce.count +
              '</span>';
          }
        });
      }
    }
  }

  function providerLogoSVG(key) {
    if (key === 'google') {
      return '<span class="xp-g">G</span>';
    }
    if (key === 'microsoft') {
      return (
        '<span class="xp-ms">' +
        '<span style="background:#f25022"></span>' +
        '<span style="background:#7fba00"></span>' +
        '<span style="background:#00a4ef"></span>' +
        '<span style="background:#ffb900"></span>' +
        '</span>'
      );
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

    var item = document.createElement('button');
    item.className = 'xp-user-tile';
    item.setAttribute('data-login', p.connectionId);
    item.innerHTML =
      '<div class="xp-user-avatar">' +
      providerLogoSVG(p.key) +
      '</div>' +
      '<div class="xp-user-name">' +
      p.label +
      '</div>';

    item.addEventListener('click', function () {
      if (window.login) {
        window.login({ connectionId: p.connectionId });
      } else {
        window.location.href =
          '/api/auth/login?connection_id=' + encodeURIComponent(p.connectionId);
      }
    });

    $options.appendChild(item);
  }

  function attach() {
    if (!$root) return;

    $root.addEventListener('click', function (e) {
      var t = e.target.closest('.xp-cell');
      if (!t) return;
      var i = Number(t.getAttribute('data-i'));
      revealCell(i);
    });

    function restart() {
      init();
    }
    if ($restart) $restart.addEventListener('click', restart);
    if ($resetTop) $resetTop.addEventListener('click', restart);
  }

  function init() {
    board = computeBoard();
    revealed = new Set();
    seenProviders = new Set();
    if ($options) $options.innerHTML = '';
    draw();
    setMinesLeft(PROVIDERS.length);
    setTimer(0);
    startTimer();
  }

  attach();
  init();
})();
