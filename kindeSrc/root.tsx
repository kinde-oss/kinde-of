'use server';
// @ts-nocheck

import {
  getKindeCSRF,
  getKindeRequiredCSS,
  getKindeRequiredJS,
  getSVGFaviconUrl,
  type KindePageEvent,
} from '@kinde/infrastructure';
import React from 'react';
import { getStyles } from './styles/styles';
interface RootProps extends KindePageEvent {
  children: React.ReactNode;
}

export const Root = ({
  children,
  context,
  request,
}: RootProps): React.JSX.Element => {
  return (
    <html dir={request.locale.isRtl ? 'rtl' : 'ltr'} lang={request.locale.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="noindex" name="robots" />
        <meta content={getKindeCSRF()} name="csrf-token" />
        <meta content="light" name="color-scheme" />
        <meta content="nopagereadaloud" name="google" />
        <meta
          content={String((request as any).nonce || '')}
          name="msw-nonce-prop"
        />
        <title>{context.widget.content.pageTitle}</title>

        <link href={getSVGFaviconUrl()} rel="icon" type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style>{getStyles()}</style>
      </head>

      <body>
        <div data-kinde-root="true">{children}</div>
      </body>
    </html>
  );
};
