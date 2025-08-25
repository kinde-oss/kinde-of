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
    background:
      'linear-gradient(135deg, #3a6ea5 0%, #004e98 50%, #3a6ea5 100%)',
  },
};

type LayoutProps = {
  children: React.ReactNode;
};

export const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div style={styles.container}>{children}</div>;
};
