'use server';

import React from 'react';

type WidgetProps = {
  heading: string;
  description: string;
  nonce?: string;
  requestUrl?: string;
};

export const Widget: React.FC<WidgetProps> = (props) => {
  // gen random positions for auth methods
  const getRandomPositions = () => {
    const positions: number[] = [];
    const gridSize = 64; // 8x8 = 64 cells
    const authMethods = ['google', 'facebook', 'email'];

    for (let i = 0; i < 3; i++) {
      let pos;
      do {
        pos = Math.floor(Math.random() * gridSize);
      } while (positions.includes(pos));
      positions.push(pos);
    }

    return positions.map((pos, index) => ({
      position: pos,
      type: authMethods[index],
    }));
  };

  const authPositions = getRandomPositions();

  // Calculate adjacency counts
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
          if (authPositions.some((ap) => ap.position === newPos)) {
            count++;
          }
        }
      }
    }
    return count;
  };

  // Define cell types
  type AuthCell = {
    type: 'auth';
    authType: string;
    revealed: boolean;
  };

  type NumberCell = {
    type: 'number';
    count: number;
    revealed: boolean;
  };

  type Cell = AuthCell | NumberCell;

  // Create grid with random placements
  const createGrid = (): Cell[] => {
    const grid: Cell[] = [];
    for (let i = 0; i < 64; i++) {
      const authMethod = authPositions.find((ap) => ap.position === i);
      if (authMethod) {
        grid.push({
          type: 'auth',
          authType: authMethod.type,
          revealed: true,
        });
      } else {
        const count = calculateAdjacency(i);
        grid.push({
          type: 'number',
          count: count,
          revealed: true,
        });
      }
    }
    return grid;
  };

  const grid = createGrid();

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

            <div className="msw-game-container">
              <div className="msw-game">
                <div className="msw-game-header">
                  <div className="msw-counter">003</div>
                  <button className="msw-reset">😊</button>
                  <div className="msw-counter">000</div>
                </div>

                <div className="msw-field">
                  {grid.map((cell, index) => (
                    <div
                      key={index}
                      className={`msw-cell revealed ${cell.type === 'auth' ? 'auth' : ''}`}
                      style={{
                        color:
                          cell.type === 'number' && cell.count > 0
                            ? getNumberColor(cell.count)
                            : 'transparent',
                        backgroundColor:
                          cell.type === 'auth'
                            ? cell.authType === 'google'
                              ? '#4285f4'
                              : cell.authType === 'facebook'
                                ? '#1877f2'
                                : cell.authType === 'email'
                                  ? '#ff6b35'
                                  : '#fff'
                            : undefined,
                      }}
                    >
                      {cell.type === 'auth' ? (
                        <img
                          src={`/images/files/${cell.authType}.png`}
                          alt={cell.authType}
                          style={{
                            width: '20px',
                            height: '20px',
                            objectFit: 'contain',
                          }}
                        />
                      ) : cell.count > 0 ? (
                        cell.count
                      ) : (
                        ''
                      )}
                    </div>
                  ))}
                </div>

                <button className="msw-play-again">Play Again</button>
              </div>
            </div>
          </div>
        </div>

        <div className="msw-auth-panel" style={{ display: 'flex' }}>
          {authPositions.map((auth) => (
            <a
              key={auth.type}
              href={`/api/auth/login?connection_id=${getConnectionId(auth.type)}`}
              className={`msw-oauth ${auth.type}`}
            >
              <div className={`msw-oauth-icon ${auth.type}-icon`}>
                <img
                  src={`/images/files/${auth.type}.png`}
                  alt={auth.type}
                  style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                  }}
                />
              </div>
              {auth.type.charAt(0).toUpperCase() + auth.type.slice(1)}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};
