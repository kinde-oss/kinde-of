'use server';

import React from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

type DefaultLayoutProps = {
  children: React.ReactNode;
  isRegisterPage?: boolean;
};

const styles: {
  container: React.CSSProperties;
} = {
  container: {
    height: '100vh',
    backgroundColor: '#FEF5ED',
    color: '#184027',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

export const DefaultLayout = ({
  children,
  isRegisterPage = false,
}: DefaultLayoutProps): React.JSX.Element => (
  <div>
    <main style={styles.container} id="main">
      <Header page={isRegisterPage ? 'register' : 'login'} />
      {children}
      <Footer />
    </main>
  </div>
);
