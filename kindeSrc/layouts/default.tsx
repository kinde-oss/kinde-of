import React from 'react';

const styles: {
  container: React.CSSProperties;
} = {
  container: {
    minHeight: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0d58c3',
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div style={styles.container}>{children}</div>;
};
