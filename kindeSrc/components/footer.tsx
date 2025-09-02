'use server';

import React from 'react';

const styles: {
  policies: React.CSSProperties;
  links: React.CSSProperties;
  link: React.CSSProperties;
} = {
  policies: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.8rem',
    padding: '2rem',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.5rem',
    gap: '0.5rem',
  },
  link: {
    color: '#184027',
    fontWeight: 500,
  },
};

export const Footer = () => {
  return (
    <div style={styles.policies}>
      <p>By continuing, you agree to our policies</p>
      <div style={styles.links}>
        <a style={styles.link} href="#">
          Privacy Policy
        </a>
        ·
        <a style={styles.link} href="#">
          Terms of Service
        </a>
      </div>
    </div>
  );
};
