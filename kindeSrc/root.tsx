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
        <title>{context.widget.content.pageTitle}</title>

        <link href={getSVGFaviconUrl()} rel="icon" type="image/svg+xml" />
        {getKindeRequiredCSS()}
        {getKindeRequiredJS()}
        <style>{getStyles()}</style>
        <script
          nonce={(request as any).nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try { console.log('[MSW] loader start', { nonce: document.currentScript && document.currentScript.nonce }); } catch(e) {}
                var s = document.createElement('script');
                s.src = '/msw-y2k.js';
                try { s.nonce = document.currentScript && document.currentScript.nonce; } catch(e) {}
                s.defer = true;
                document.head.appendChild(s);
              })();
            `,
          }}
        />
      </head>

      <body>
        <div data-kinde-root="true">{children}</div>
      </body>
    </html>
  );
};
