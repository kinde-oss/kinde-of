'use client';

import { usePathname } from 'next/navigation';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';
import Image from 'next/image';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  user?: any;
  isAuthenticated: boolean;
}

export default function ConditionalLayout({
  children,
  user,
  isAuthenticated,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  if (isDashboard) {
    return (
      <>
        <header>
          <nav className="nav container">
            <h1 className="text-display-3">Kinde Of</h1>
            <div>
              {!isAuthenticated ? (
                <>
                  <LoginLink className="btn btn-ghost sign-in-btn">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
                </>
              ) : (
                <div className="profile-blob">
                  {user?.picture ? (
                    <Image
                      className="avatar"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="avatar">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="text-heading-2">
                      {user?.given_name} {user?.family_name}
                    </p>

                    <LogoutLink className="text-subtle">Log out</LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <header>
        <nav className="nav container">
          <h1 className="text-display-3">KindeAuth</h1>
          <div>
            {!isAuthenticated ? (
              <>
                <LoginLink className="btn btn-ghost sign-in-btn">
                  Sign in
                </LoginLink>
                <RegisterLink className="btn btn-dark">Sign up</RegisterLink>
              </>
            ) : (
              <div className="profile-blob">
                {user?.picture ? (
                  <Image
                    className="avatar"
                    src={user?.picture}
                    alt="user profile avatar"
                    referrerPolicy="no-referrer"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="avatar">
                    {user?.given_name?.[0]}
                    {user?.family_name?.[0]}
                  </div>
                )}
                <div>
                  <p className="text-heading-2">
                    {user?.given_name} {user?.family_name}
                  </p>

                  <LogoutLink className="text-subtle">Log out</LogoutLink>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <strong className="text-heading-2">KindeAuth</strong>
          <p className="footer-tagline text-body-3">
            Visit our{' '}
            <Link className="link" href="https://kinde.com/docs">
              help center
            </Link>
          </p>

          <small className="text-subtle">
            © 2025 KindeAuth, Inc. All rights reserved
          </small>
        </div>
      </footer>
    </>
  );
}
