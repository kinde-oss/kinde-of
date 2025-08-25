'use server';
// @ts-nocheck

import { Widget } from '../../../../components/widget';
import { DefaultLayout } from '../../../../layouts/default';
import { type KindePageEvent } from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { Root } from '../../../../root';

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
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
  const page = await DefaultPage(event);
  return renderToString(page);
}
