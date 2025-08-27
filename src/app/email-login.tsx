'use client';

import React, { useState } from 'react';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs';

export function EmailLogin({
  emailConnectionId,
}: {
  emailConnectionId: string;
}) {
  const [email, setEmail] = useState('');

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <label htmlFor="email" style={{ display: 'block', marginBottom: 8 }}>
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #ccc',
          borderRadius: 6,
        }}
      />
      <div style={{ height: 12 }} />
      <LoginLink
        authUrlParams={{
          connectionId: emailConnectionId,
          login_hint: email,
          prompt: 'login',
        }}
      >
        <button
          disabled={!email}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: '#111827',
            color: 'white',
            borderRadius: 6,
            border: 'none',
            cursor: email ? 'pointer' : 'not-allowed',
          }}
        >
          Continue with email
        </button>
      </LoginLink>
    </div>
  );
}
