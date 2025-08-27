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

const RegisterPage: React.FC<KindePageEvent> = ({ context, request }) => {
  return (
    <Root context={context} request={request}>
      <DefaultLayout>
        <div data-kinde-root="/auth">
          <Widget
            heading={context.widget.content.heading}
            description={context.widget.content.description}
            nonce={(request as any).nonce}
            requestUrl={(request as any).url}
          />
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
  const page = await RegisterPage(event);
  const pageHtml = renderToString(page);

  // Add the minesweeper JavaScript after rendering
  const script = `
    <script nonce="${getKindeNonce()}">
      document.addEventListener('DOMContentLoaded', function() {
        // Get current URL parameters
        function getUrlParams() {
          const params = new URLSearchParams(window.location.search);
          return {
            revealed: params.get('revealed') ? params.get('revealed').split(',').map(n => parseInt(n)).filter(n => !isNaN(n) && n >= 0 && n < 64) : [],
            seed: params.get('seed') ? parseInt(params.get('seed')) : 12345
          };
        }
        
        // Generate auth methods based on seed
        function generateAuthMethods(seed) {
          const seededRandom = (s) => {
            let x = Math.sin(s) * 10000;
            return x - Math.floor(x);
          };
          
          const positions = [];
          const authTypes = ['google', 'facebook', 'email'];
          let currentSeed = seed;
          
          for (let i = 0; i < 3; i++) {
            let pos;
            do {
              pos = Math.floor(seededRandom(currentSeed++) * 64);
            } while (positions.includes(pos));
            positions.push(pos);
          }
          
          return positions.map((pos, index) => ({
            position: pos,
            type: authTypes[index]
          }));
        }
        
        // Update URL and reload page
        function updateGame(newRevealed, seed) {
          const params = new URLSearchParams();
          if (newRevealed.length > 0) {
            params.set('revealed', newRevealed.sort((a, b) => a - b).join(','));
          }
          if (seed && seed !== 12345) {
            params.set('seed', seed.toString());
          }
          const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
          window.location.href = newUrl;
        }
        
        // Handle cell clicks
        const { revealed, seed } = getUrlParams();
        const authMethods = generateAuthMethods(seed);
        
        document.querySelectorAll('.msw-cell.hidden').forEach((cell) => {
          cell.addEventListener('click', function(e) {
            e.preventDefault();
            const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
            const newRevealed = [...revealed, cellIndex];
            updateGame(newRevealed, seed);
          });
        });
        
        // Handle reset button
        const resetBtn = document.querySelector('.msw-reset');
        if (resetBtn) {
          resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const newSeed = Math.floor(Math.random() * 100000);
            updateGame([], newSeed);
          });
        }
      });
    </script>
  `;

  // Insert the script before the closing body tag
  return pageHtml.replace('</body>', script + '</body>');
}
