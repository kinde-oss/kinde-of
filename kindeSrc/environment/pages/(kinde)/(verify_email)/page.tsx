'use server';
// @ts-nocheck

import { DefaultLayout } from '../../../../layouts/default';
import {
  type KindePageEvent,
  getKindeNonce,
  getKindeWidget,
} from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { Root } from '../../../../root';

const VerifyEmailPage: React.FC<KindePageEvent> = ({ context, request }) => {
  console.log('VerifyEmailPage', context);

  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <div data-kinde-root="/auth">
          {/* Render Kinde's built-in verify email step UI visibly */}
          <div dangerouslySetInnerHTML={{ __html: getKindeWidget() }} />
        </div>
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await VerifyEmailPage(event);
  const pageHtml = renderToString(page);

  // Optionally add small script to focus the first input if present
  const script = `
    <script nonce="${getKindeNonce()}">
      document.addEventListener('DOMContentLoaded', function() {
        const input = document.querySelector('input');
        if (input) { try { input.focus(); } catch (e) {} }
      });
    </script>
  `;

  return pageHtml.replace('</body>', script + '</body>');
}
