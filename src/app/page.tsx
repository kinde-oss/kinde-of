import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

export default function Home() {
  return (
    <div className="boot-screen">
      <div className="boot-content">
        {/* Main logo with registered mark */}
        <div className="boot-logo-container">
          <h1 className="boot-logo">Kinde Of</h1>
          <span className="boot-logo-mark">®</span>
        </div>

        {/* Auth buttons */}
        <div className="boot-auth">
          <LoginLink className="boot-button boot-signin">Sign In</LoginLink>
          <RegisterLink className="boot-button boot-signup">
            Sign Up
          </RegisterLink>
        </div>

        {/* Copyright */}
        <div className="boot-copyright">
          Copyright (c) Kinde Corporation, 2025. All Rights Reserved.
          <br />
          Kinde Of is a registered trademark of Kinde Corp.
        </div>
      </div>
    </div>
  );
}
