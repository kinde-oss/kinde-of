'use server';

import React from 'react';

type WidgetProps = {
  heading: string;
  description: string;
  nonce?: string;
  requestUrl?: string;
};

export const Widget: React.FC<WidgetProps> = (props) => {
  // Parse revealed cells from URL if available
  const getRevealedCells = () => {
    if (!props.requestUrl) return [];
    try {
      const url = new URL(props.requestUrl);
      const revealed = url.searchParams.get('revealed');
      if (revealed) {
        return revealed
          .split(',')
          .map((n) => parseInt(n))
          .filter((n) => !isNaN(n) && n >= 0 && n < 64);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
    return [];
  };

  // Generate random auth method positions based on URL seed
  const getAuthMethods = () => {
    const seedParam = props.requestUrl
      ? new URL(props.requestUrl).searchParams.get('seed')
      : null;
    const seed = seedParam
      ? parseInt(seedParam)
      : Math.floor(Math.random() * 100000);

    // Simple seeded random function
    const seededRandom = (seed: number) => {
      let x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const positions: number[] = [];
    const authTypes = ['google', 'facebook', 'email'];
    let currentSeed = seed;

    for (let i = 0; i < 3; i++) {
      let pos;
      do {
        pos = Math.floor(seededRandom(currentSeed++) * 64);
      } while (positions.includes(pos));
      positions.push(pos);
    }

    return positions.map((pos, index) => ({
      position: pos,
      type: authTypes[index],
    }));
  };

  const authMethods = getAuthMethods();

  const getConnectionId = (type: string) => {
    switch (type) {
      case 'google':
        return 'conn_019872d36897cefc0235b3e946560f7f';
      case 'facebook':
        return 'conn_0198a61044542d21e9fa9057f5d14efc';
      case 'email':
        return 'conn_01986aa4b37660f9c12738960ed5b36a';
      default:
        return '';
    }
  };

  const calculateAdjacency = (pos: number) => {
    const row = Math.floor(pos / 8);
    const col = pos % 8;
    let count = 0;

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue;
        const newRow = row + r;
        const newCol = col + c;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const newPos = newRow * 8 + newCol;
          if (authMethods.some((am) => am.position === newPos)) {
            count++;
          }
        }
      }
    }
    return count;
  };

  const getNumberColor = (num: number) => {
    const colors = [
      '',
      '#0000FF',
      '#008000',
      '#FF0000',
      '#800080',
      '#800000',
      '#008080',
      '#000000',
      '#808080',
    ];
    return colors[num] || '#000000';
  };

  // Use URL state or start with empty game
  const revealedCells = getRevealedCells();
  const revealedAuthMethods = authMethods.filter((am) =>
    revealedCells.includes(am.position)
  );

  // Helper to create reveal URL
  const createRevealUrl = (cellIndex: number) => {
    const newRevealed = [...revealedCells, cellIndex].sort((a, b) => a - b);
    const seedParam = props.requestUrl
      ? new URL(props.requestUrl).searchParams.get('seed')
      : null;
    const seed = seedParam ? `&seed=${seedParam}` : '';
    return `?revealed=${newRevealed.join(',')}${seed}&t=${Date.now()}`;
  };

  return (
    <main className="login-form">
      <div className="msw-login-container">
        <div className="msw-window">
          <div className="msw-title-bar">
            <div className="msw-window-title">Login</div>
            <div className="msw-window-controls">
              <div className="msw-window-btn">−</div>
              <div className="msw-window-btn">□</div>
              <div className="msw-window-btn">✕</div>
            </div>
          </div>

          <div className="msw-content">
            <div className="msw-main-title">Minesweeper Login</div>

            <div className="msw-game">
              <div className="msw-game-header">
                <div className="msw-counter">
                  {String(3 - revealedAuthMethods.length).padStart(3, '0')}
                </div>
                <a
                  href={`?seed=${Math.floor(Math.random() * 100000)}`}
                  className="msw-reset"
                >
                  😊
                </a>
                <div className="msw-counter">000</div>
              </div>

              <div className="msw-field">
                {Array.from({ length: 64 }, (_, index) => {
                  const isRevealed = revealedCells.includes(index);
                  const authMethod = authMethods.find(
                    (am) => am.position === index
                  );
                  const isAuth = !!authMethod;
                  const adjacencyCount = calculateAdjacency(index);

                  if (isRevealed) {
                    return (
                      <div
                        key={index}
                        className={`msw-cell revealed ${isAuth ? 'auth' : ''}`}
                        style={{
                          color:
                            !isAuth && adjacencyCount > 0
                              ? getNumberColor(adjacencyCount)
                              : 'transparent',
                          backgroundColor: isAuth
                            ? authMethod?.type === 'google'
                              ? '#4285f4'
                              : authMethod?.type === 'facebook'
                                ? '#1877f2'
                                : authMethod?.type === 'email'
                                  ? '#ff6b35'
                                  : '#fff'
                            : undefined,
                          fontWeight: isAuth ? 'bold' : 'normal',
                          fontSize: isAuth ? '16px' : '12px',
                        }}
                      >
                        {isAuth
                          ? authMethod?.type === 'google'
                            ? 'G'
                            : authMethod?.type === 'facebook'
                              ? 'f'
                              : authMethod?.type === 'email'
                                ? '✉'
                                : ''
                          : adjacencyCount > 0
                            ? adjacencyCount
                            : ''}
                      </div>
                    );
                  } else {
                    // Hidden cell - make it clickable with a link
                    return (
                      <a
                        key={index}
                        href={createRevealUrl(index)}
                        className="msw-cell hidden"
                        style={{
                          all: 'unset',
                          width: '32px',
                          height: '32px',
                          background:
                            'linear-gradient(145deg, #e0e0e0, #c0c0c0)',
                          border: '2px outset #c0c0c0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                        }}
                      ></a>
                    );
                  }
                })}
              </div>

              {/* Show auth methods found within the game area */}
              {revealedAuthMethods.length > 0 && (
                <div className="msw-found-methods">
                  {revealedAuthMethods.map((auth) => (
                    <a
                      key={auth.type}
                      href={`/api/auth/login?connection_id=${getConnectionId(auth.type)}`}
                      className={`msw-oauth-small ${auth.type}`}
                    >
                      <div className={`msw-oauth-icon-small ${auth.type}-icon`}>
                        {auth.type === 'google'
                          ? 'G'
                          : auth.type === 'facebook'
                            ? 'f'
                            : auth.type === 'email'
                              ? '✉'
                              : ''}
                      </div>
                      {auth.type.charAt(0).toUpperCase() + auth.type.slice(1)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions panel outside the dialog */}
        <div className="msw-instructions-panel">
          <div className="msw-instructions">
            <h3>How to Play</h3>
            <p>Click squares to reveal login methods!</p>
            <p>Numbers show how many login methods are nearby.</p>
          </div>
        </div>
      </div>
    </main>
  );
};
