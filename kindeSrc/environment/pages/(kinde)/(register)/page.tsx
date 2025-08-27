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
        
        // Handle cell clicks and update display
        const { revealed, seed } = getUrlParams();
        const authMethods = generateAuthMethods(seed);
        
        // Function to calculate adjacency count
        function calculateAdjacency(pos, authMethods) {
          const row = Math.floor(pos / 8);
          const col = pos % 8;
          let count = 0;
          
          for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
              if (r === 0 && c === 0) continue;
              const newRow = row + r;
              const newCol = col + c;
              if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newPos = newRow * 8 + newCol;
                if (authMethods.some(am => am.position === newPos)) {
                  count++;
                }
              }
            }
          }
          return count;
        }
        
        // Function to get number color
        function getNumberColor(num) {
          const colors = ['', '#0000FF', '#008000', '#FF0000', '#800080', '#800000', '#008080', '#000000', '#808080'];
          return colors[num] || '#000000';
        }
        
        // Function to get connection ID
        function getConnectionId(type) {
          switch (type) {
            case 'google': return 'conn_019872d36897cefc0235b3e946560f7f';
            case 'facebook': return 'conn_0198a61044542d21e9fa9057f5d14efc';
            case 'email': return 'conn_01986aa4b37660f9c12738960ed5b36a';
            default: return '';
          }
        }
        
        // Update display based on current state
        function updateDisplay() {
          const { revealed, seed } = getUrlParams();
          const authMethods = generateAuthMethods(seed);
          const revealedAuthMethods = authMethods.filter(am => revealed.includes(am.position));
          
          // Update counter
          const counter = document.querySelector('.msw-counter');
          if (counter) {
            counter.textContent = String(3 - revealedAuthMethods.length).padStart(3, '0');
          }
          
          // Update cells
          document.querySelectorAll('.msw-cell').forEach((cell, index) => {
            const cellIndex = parseInt(cell.getAttribute('data-cell-index') || index);
            const isRevealed = revealed.includes(cellIndex);
            const authMethod = authMethods.find(am => am.position === cellIndex);
            const isAuth = !!authMethod;
            const adjacencyCount = calculateAdjacency(cellIndex, authMethods);
            
            if (isRevealed) {
              cell.className = 'msw-cell revealed' + (isAuth ? ' auth' : '');
              cell.style.backgroundColor = isAuth 
                ? (authMethod.type === 'google' ? '#4285f4' : authMethod.type === 'facebook' ? '#1877f2' : '#ff6b35')
                : '';
              cell.style.color = !isAuth && adjacencyCount > 0 ? getNumberColor(adjacencyCount) : 'transparent';
              cell.style.fontWeight = isAuth ? 'bold' : 'normal';
              cell.style.fontSize = isAuth ? '16px' : '12px';
              cell.textContent = isAuth 
                ? (authMethod.type === 'google' ? 'G' : authMethod.type === 'facebook' ? 'f' : '✉')
                : (adjacencyCount > 0 ? adjacencyCount : '');
            }
          });
          
          // Update auth methods section
          let authMethodsContainer = document.querySelector('.msw-found-methods');
          if (revealedAuthMethods.length > 0) {
            if (!authMethodsContainer) {
              authMethodsContainer = document.createElement('div');
              authMethodsContainer.className = 'msw-found-methods';
              document.querySelector('.msw-game').appendChild(authMethodsContainer);
            }
            
            authMethodsContainer.innerHTML = revealedAuthMethods.map(auth => 
              '<a href="/api/auth/login?connection_id=' + getConnectionId(auth.type) + '" class="msw-oauth-small ' + auth.type + '">' +
              '<div class="msw-oauth-icon-small ' + auth.type + '-icon">' +
              (auth.type === 'google' ? 'G' : auth.type === 'facebook' ? 'f' : '✉') +
              '</div>' +
              auth.type.charAt(0).toUpperCase() + auth.type.slice(1) +
              '</a>'
            ).join('');
          } else if (authMethodsContainer) {
            authMethodsContainer.remove();
          }
        }
        
        // Initial display update
        updateDisplay();
        
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
