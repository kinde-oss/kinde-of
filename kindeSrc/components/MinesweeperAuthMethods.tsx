'use client';

import React, { useState, useEffect } from 'react';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';

interface Connection {
  id: string;
  strategy: string;
}

interface AuthMethod {
  type: string;
  connectionId: string;
  position: number;
}

interface MinesweeperAuthMethodsProps {
  connections: Connection[];
}

// Function to get display icon for auth type
function getAuthIcon(type: string): string {
  switch (type) {
    case 'google':
      return 'G';
    case 'facebook':
      return 'f';
    case 'email':
      return '✉';
    case 'microsoft':
      return 'M';
    case 'apple':
      return '🍎';
    case 'github':
      return '';
    default:
      return '?';
  }
}

export default function MinesweeperAuthMethods({
  connections,
}: MinesweeperAuthMethodsProps) {
  const [revealedAuthMethods, setRevealedAuthMethods] = useState<AuthMethod[]>(
    []
  );

  useEffect(() => {
    // Listen for updates from the minesweeper game
    const handleAuthMethodsUpdate = (event: CustomEvent) => {
      setRevealedAuthMethods(event.detail.revealedAuthMethods);
    };

    // Add event listener
    window.addEventListener(
      'updateAuthMethods' as any,
      handleAuthMethodsUpdate
    );

    // Expose function for minesweeper JavaScript to call
    (window as any).updateRevealedAuthMethods = (
      newRevealedMethods: AuthMethod[]
    ) => {
      setRevealedAuthMethods(newRevealedMethods);
    };

    return () => {
      window.removeEventListener(
        'updateAuthMethods' as any,
        handleAuthMethodsUpdate
      );
      delete (window as any).updateRevealedAuthMethods;
    };
  }, []);

  if (revealedAuthMethods.length === 0) {
    return null;
  }

  return (
    <div className="msw-found-methods">
      {revealedAuthMethods.map((auth, index) => (
        <LoginLink
          key={`${auth.connectionId}-${index}`}
          authUrlParams={{
            connectionId: auth.connectionId,
            redirectTo: '/dashboard', // Redirect to dashboard after successful login
            prompt: 'login',
          }}
        >
          <div className={`msw-oauth-small ${auth.type}`}>
            <div className={`msw-oauth-icon-small ${auth.type}-icon`}>
              {getAuthIcon(auth.type)}
            </div>
            {auth.type.charAt(0).toUpperCase() + auth.type.slice(1)}
          </div>
        </LoginLink>
      ))}
    </div>
  );
}
