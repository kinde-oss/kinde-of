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

const LoginPage: React.FC<KindePageEvent> = ({ context, request }) => {
  // Check if there's a connection_id in the URL to trigger auth
  const url = (request as any).url || '';
  const connectionIdMatch = url.match(/[?&]connection_id=([^&]*)/);

  if (connectionIdMatch) {
    // If connection_id is present, redirect to proper auth flow
    const connectionId = connectionIdMatch[1];
    const authUrl = `/api/auth/login?connection_id=${connectionId}`;

    return (
      <Root context={context} request={request}>
        <DefaultLayout>
          <div data-kinde-root="/auth">
            <script
              dangerouslySetInnerHTML={{
                __html: `window.location.href = '${authUrl}';`,
              }}
            />
            <div>Redirecting to authentication...</div>
          </div>
        </DefaultLayout>
      </Root>
    );
  }

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
  const page = await LoginPage(event);
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
        
        // Cascade reveal function
        function getCascadeReveals(startCell, authMethods, currentRevealed = []) {
          const toReveal = new Set(currentRevealed);
          const queue = [startCell];
          const visited = new Set();
          
          while (queue.length > 0) {
            const cell = queue.shift();
            if (visited.has(cell) || cell < 0 || cell >= 64) continue;
            visited.add(cell);
            toReveal.add(cell);
            
            const adjacencyCount = calculateAdjacency(cell, authMethods);
            const isAuth = authMethods.some(am => am.position === cell);
            
            // If it's an empty cell (no adjacent auth methods and not an auth method itself)
            if (adjacencyCount === 0 && !isAuth) {
              // Add all 8 neighbors to queue
              const row = Math.floor(cell / 8);
              const col = cell % 8;
              
              for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                  if (r === 0 && c === 0) continue;
                  const newRow = row + r;
                  const newCol = col + c;
                  if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const neighborCell = newRow * 8 + newCol;
                    if (!visited.has(neighborCell)) {
                      queue.push(neighborCell);
                    }
                  }
                }
              }
            }
          }
          
          return Array.from(toReveal);
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
              
              if (isAuth) {
                // Show auth method with proper styling and icon
                cell.style.backgroundColor = authMethod.type === 'google' ? '#4285f4' : authMethod.type === 'facebook' ? '#1877f2' : '#ff6b35';
                cell.style.color = 'white';
                cell.style.fontWeight = 'bold';
                cell.style.fontSize = '20px';
                cell.innerHTML = authMethod.type === 'google' 
                  ? '<span style="font-family: Arial, sans-serif;">G</span>' 
                  : authMethod.type === 'facebook' 
                    ? '<span style="font-family: Arial, sans-serif; font-weight: bold;">f</span>'
                    : '<span style="font-size: 16px;">📧</span>';
              } else {
                // Show number or empty
                cell.style.backgroundColor = '#e0e0e0';
                cell.style.color = adjacencyCount > 0 ? getNumberColor(adjacencyCount) : 'transparent';
                cell.style.fontWeight = 'bold';
                cell.style.fontSize = '12px';
                cell.textContent = adjacencyCount > 0 ? adjacencyCount : '';
              }
            } else {
              // Hidden cell - make sure it's clickable
              cell.className = 'msw-cell hidden';
              cell.style.backgroundColor = '';
              cell.style.color = '';
              cell.textContent = '';
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
              '<button data-connection-id="' + getConnectionId(auth.type) + '" data-auth-type="' + auth.type + '" class="msw-oauth-small ' + auth.type + '">' +
              '<div class="msw-oauth-icon-small ' + auth.type + '-icon">' +
              (auth.type === 'google' ? 'G' : auth.type === 'facebook' ? 'f' : '✉') +
              '</div>' +
              auth.type.charAt(0).toUpperCase() + auth.type.slice(1) +
              '</button>'
            ).join('');
            
            // Add click handlers for auth buttons
            authMethodsContainer.querySelectorAll('.msw-oauth-small').forEach(btn => {
              btn.addEventListener('click', function() {
                const connectionId = this.getAttribute('data-connection-id');
                const authType = this.getAttribute('data-auth-type');
                
                // Get current URL to construct proper auth redirect
                const currentUrl = new URL(window.location.href);
                const baseUrl = currentUrl.origin + currentUrl.pathname;
                
                // Create auth URL with connection_id parameter
                const authUrl = baseUrl + '?connection_id=' + connectionId;
                
                // Navigate to the auth URL
                window.location.href = authUrl;
              });
            });
          } else if (authMethodsContainer) {
            authMethodsContainer.remove();
          }
        }
        
        // Initial display update
        updateDisplay();
        
        // Add click handlers to ALL cells (both hidden and revealed for consistency)
        document.querySelectorAll('.msw-cell').forEach((cell) => {
          cell.addEventListener('click', function(e) {
            e.preventDefault();
            const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
            const { revealed, seed } = getUrlParams();
            const authMethods = generateAuthMethods(seed);
            
            // Don't do anything if already revealed
            if (revealed.includes(cellIndex)) return;
            
            // Use cascade reveal to get all cells that should be revealed
            const newRevealed = getCascadeReveals(cellIndex, authMethods, revealed);
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
