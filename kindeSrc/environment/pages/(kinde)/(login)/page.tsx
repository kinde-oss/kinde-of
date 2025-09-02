'use server';

import { Widget } from '../../../../components/widget';
import { type KindePageEvent } from '@kinde/infrastructure';
import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { DefaultLayout } from '../../../../layouts/default';
import { Root } from '../../../../root';

const DefaultPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <Widget heading={context.widget.content.heading} />
      </DefaultLayout>
    </Root>
  );
};

// Page Component
export default async function Page(event: KindePageEvent): Promise<string> {
  console.log('test123 login page', event);

  const page = await DefaultPage(event);
  return renderToString(page);
}
