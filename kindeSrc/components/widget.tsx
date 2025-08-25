'use client';
// @ts-nocheck

import React, { useEffect, useMemo, useState } from 'react';

type AuthType = 'google' | 'facebook' | 'email';

type Cell = {
  revealed: boolean;
  isAuth: boolean;
  authType: AuthType | null;
};

const GRID_SIZE = 8;
const AUTH_METHODS: AuthType[] = ['google', 'facebook', 'email'];

export const Widget = (props: {
  heading: string;
  description: string;
  nonce?: string;
}) => {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [revealedAuth, setRevealedAuth] = useState<AuthType[]>([]);

  const initializeGrid = useMemo(() => {
    return () => {
      const next: Cell[] = Array.from(
        { length: GRID_SIZE * GRID_SIZE },
        () => ({
          revealed: false,
          isAuth: false,
          authType: null,
        })
      );

      const chosenPositions: number[] = [];
      while (chosenPositions.length < 3) {
        const pos = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
        if (!chosenPositions.includes(pos)) {
          const idx = chosenPositions.length;
          chosenPositions.push(pos);
          next[pos].isAuth = true;
          next[pos].authType = AUTH_METHODS[idx];
        }
      }

      return next;
    };
  }, []);

  useEffect(() => {
    setGrid(initializeGrid());
    setRevealedAuth([]);
  }, [initializeGrid]);

  const countAdjacentAuth = (index: number) => {
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    let count = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < GRID_SIZE &&
          newCol >= 0 &&
          newCol < GRID_SIZE
        ) {
          const newIndex = newRow * GRID_SIZE + newCol;
          if (grid[newIndex]?.isAuth) count++;
        }
      }
    }
    return count;
  };

  const getNumberColor = (num: number) => {
    const colors = [
      '',
      'blue',
      'green',
      'red',
      'purple',
      'maroon',
      'turquoise',
      'black',
      'gray',
    ] as const;
    return (colors as readonly string[])[num] || 'black';
  };

  const revealCell = (index: number) => {
    if (grid[index]?.revealed) return;
    setGrid((prev) => {
      const next = [...prev];
      const cell = { ...next[index], revealed: true } as Cell;
      next[index] = cell;

      if (cell.isAuth && cell.authType) {
        setRevealedAuth((prevAuth) =>
          prevAuth.includes(cell.authType!)
            ? prevAuth
            : [...prevAuth, cell.authType!]
        );
      }
      return next;
    });
  };

  const restart = () => {
    setGrid(initializeGrid());
    setRevealedAuth([]);
  };

  return (
    <main className="login-form">
      <div className="msw-login-container">
        <div className="msw-left">
          <div className="msw-logo">🪟 Windows</div>
          <div className="msw-subtitle">
            Uncover authentication methods to log in
          </div>

          <div className="msw-game">
            <div className="msw-game-header">
              <div className="msw-counter">003</div>
              <button
                className="msw-reset"
                onClick={restart}
                aria-label="Restart"
              >
                🙂
              </button>
              <div className="msw-counter">000</div>
            </div>

            <div className="msw-field" role="grid">
              {grid.map((cell, i) => {
                const adjacent =
                  cell.revealed && !cell.isAuth ? countAdjacentAuth(i) : 0;
                const isAuth = cell.revealed && cell.isAuth;
                return (
                  <button
                    type="button"
                    key={i}
                    className={`msw-cell${cell.revealed ? ' revealed' : ''}${isAuth ? ' auth' : ''}`}
                    onClick={() => revealCell(i)}
                    aria-label={`cell-${i}`}
                  >
                    {isAuth && cell.authType === 'google' && (
                      <span>
                        📧
                        <br />
                        Google
                      </span>
                    )}
                    {isAuth && cell.authType === 'facebook' && (
                      <span>
                        👥
                        <br />
                        Facebook
                      </span>
                    )}
                    {isAuth && cell.authType === 'email' && (
                      <span>
                        ✉️
                        <br />
                        Email
                      </span>
                    )}
                    {!isAuth && cell.revealed && adjacent > 0 && (
                      <span style={{ color: getNumberColor(adjacent) }}>
                        {adjacent}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="msw-found">
            Authentication methods found: {revealedAuth.length}/3
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
            {revealedAuth.length === 0 && (
              <div className="msw-auth active">
                <div className="msw-auth-title">
                  🎯 Start Playing Minesweeper
                </div>
                <p className="msw-muted">
                  Uncover tiles on the left to reveal login options
                </p>
              </div>
            )}

            {revealedAuth.includes('google') && (
              <div className="msw-auth active">
                <div className="msw-auth-title">🔍 Google Authentication</div>
                <button
                  className="msw-oauth google"
                  onClick={() => alert('Google OAuth with Kinde')}
                >
                  📧 Sign in with Google
                </button>
                <p className="msw-hint">
                  Secure OAuth2 authentication via Google
                </p>
              </div>
            )}

            {revealedAuth.includes('facebook') && (
              <div className="msw-auth active">
                <div className="msw-auth-title">📘 Facebook Authentication</div>
                <button
                  className="msw-oauth facebook"
                  onClick={() => alert('Facebook OAuth with Kinde')}
                >
                  👥 Sign in with Facebook
                </button>
                <p className="msw-hint">Connect using your Facebook account</p>
              </div>
            )}

            {revealedAuth.includes('email') && (
              <div className="msw-auth active">
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
                  <button
                    className="msw-submit"
                    onClick={() => alert('Email/password with Kinde')}
                  >
                    Log in
                  </button>
                  <div className="msw-center">
                    <a className="msw-link" href="#">
                      Create new account
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
