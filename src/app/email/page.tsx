'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { EmailLogin } from '../email-login';

export default function EmailPage() {
  const searchParams = useSearchParams();
  const emailConnectionId = searchParams.get('connection_id') || '';

  return (
    <main style={{ minHeight: '60vh', padding: 24 }}>
      <EmailLogin emailConnectionId={emailConnectionId} />
    </main>
  );
}
