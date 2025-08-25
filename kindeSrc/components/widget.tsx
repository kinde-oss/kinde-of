'use server';
// @ts-nocheck

import { getKindeWidget } from '@kinde/infrastructure';
import React from 'react';

const styles: {
  container: React.CSSProperties;
  heading: React.CSSProperties;
  description: React.CSSProperties;
} = {
  container: {
    minHeight: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background:
      'url(https://asset.kindedemo.com/evolve-ai/bg.png) lightgray 50% / cover no-repeat',
  },

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
  },
};

export const Widget = (props: { heading: string; description: string }) => {
  return (
    <main className="login-form">
      <div
        style={{
          width: '100%',
        }}
      >
        <h1 style={styles.heading}>{props.heading}</h1>
        <p style={styles.description}>{props.description}</p>
        {getKindeWidget()}
      </div>
    </main>
  );
};
