import {
  getDarkModeLogoUrl,
  getKindeLoginUrl,
  getKindeRegisterUrl,
} from '@kinde/infrastructure';
import React from 'react';

export const Header = (props: { page: 'login' | 'register' }) => {
  return (
    <>
      <style>
        {`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
        }

        .logo {
          width: 150px;
          display: block;
        }

        .action-button {
          color: #184027;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 99px;
          cursor: pointer;
          text-decoration: none;
        }

        @media only screen and (min-width: 1024px) {
          .logo {
            display: none;
          }
        }
      `}
      </style>
      <div className="header">
        <div>
          <img className="logo" src={getDarkModeLogoUrl()} alt={'logo'} />
        </div>
        {props.page === 'login' ? (
          <a href={getKindeRegisterUrl()} className="action-button">
            SIGN UP
          </a>
        ) : (
          <a href={getKindeLoginUrl()} className="action-button">
            SIGN IN
          </a>
        )}
      </div>
    </>
  );
};
