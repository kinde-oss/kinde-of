'use server';
// @ts-nocheck

import { Widget } from '../../../../components/widget';
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
        <Widget
          heading={context.widget.content.heading}
          description={context.widget.content.description}
          nonce={(request as any).nonce}
          requestUrl={(request as any).url}
        />
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
