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

const EmailPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <div data-kinde-root="/auth">
          <div
            className="msw-email-container"
            style={{
              maxWidth: 380,
              margin: '24px auto',
              background: '#f3f3f3',
              padding: 16,
              borderRadius: 8,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: 18,
                margin: '0 0 12px',
              }}
            >
              Continue with Email
            </h2>
            <form id="email-login-form">
              <label
                htmlFor="email-input"
                style={{ display: 'block', marginBottom: 8, fontSize: 12 }}
              >
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                required
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #ccc',
                  borderRadius: 6,
                  outline: 'none',
                  fontSize: 14,
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: 12,
                  width: '100%',
                  padding: '10px 12px',
                  background: '#111827',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Continue
              </button>
            </form>
          </div>

          {/* Hidden Kinde widget for functionality */}
          <div style={{ display: 'none' }}>
            <div dangerouslySetInnerHTML={{ __html: getKindeWidget() }} />
          </div>
        </div>
      </DefaultLayout>
    </Root>
  );
};

export default async function Page(event: KindePageEvent): Promise<string> {
  const page = await EmailPage(event);
  const pageHtml = renderToString(page);

  const script = `
    <script nonce="${getKindeNonce()}">
      document.addEventListener('DOMContentLoaded', function () {
        try {
          var params = new URLSearchParams(window.location.search);
          var connectionId = params.get('connection_id') || '';
          var form = document.getElementById('email-login-form');
          if (!form) return;

          form.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = document.getElementById('email-input');
            if (!input) return;
            var email = (input.value || '').trim();
            if (!email) return;

            var base = (window.CUSTOM_DOMAIN || '') + '/api/auth/login?connection_id=' + encodeURIComponent(connectionId);
            var url = base + '&login_hint=' + encodeURIComponent(email);
            window.location.href = url;
          });
        } catch (err) {}
      });
    </script>
  `;

  return pageHtml.replace('</body>', script + '</body>');
}
