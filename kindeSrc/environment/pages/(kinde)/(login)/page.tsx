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
  // Use your connection IDs for the application
  const connections: Array<{ id: string; strategy: string }> = [
    { id: 'conn_019872d36897cefc0235b3e946560f7f', strategy: 'google' },
    { id: 'conn_0198a61044542d21e9fa9057f5d14efc', strategy: 'facebook' },
    { id: 'conn_01986aa4b37660f9c12738960ed5b36a', strategy: 'email' },
  ];

  const page = await LoginPage(event);
  const pageHtml = renderToString(page);

  // Add the minesweeper JavaScript after rendering
  const script = `
    <script nonce="${getKindeNonce()}">
      window.KINDE_CONNECTIONS = ${JSON.stringify(connections)};
      window.CUSTOM_DOMAIN = 'https://kinde-of.com';
      window.ICON_BASE = 'https://www.kinde-of.com';
    </script>
    <script nonce="${getKindeNonce()}">
      document.addEventListener('DOMContentLoaded', function() {
        // Get current URL parameters
        function getUrlParams() {
          const params = new URLSearchParams(window.location.search);
          return {
            revealed: params.get('revealed') ? params.get('revealed').split(',').map(n => parseInt(n)).filter(n => !isNaN(n) && n >= 0 && n < 64) : [],
            seed: params.get('seed') ? parseInt(params.get('seed')) : Math.floor(Math.random() * 100000)
          };
        }
        
        // Generate auth methods based on seed and available connections
        function generateAuthMethods(seed) {
          const seededRandom = (s) => {
            let x = Math.sin(s) * 10000;
            return x - Math.floor(x);
          };
          
          const connections = window.KINDE_CONNECTIONS || [];
          const authTypes = connections.map(conn => ({
            strategy: conn.strategy,
            connectionId: conn.id
          }));
          
          const positions = [];
          let currentSeed = seed;
          
          for (let i = 0; i < Math.min(authTypes.length, 64); i++) {
            let pos;
            do {
              pos = Math.floor(seededRandom(currentSeed++) * 64);
            } while (positions.includes(pos));
            positions.push(pos);
          }
          
          return positions.map((pos, index) => ({
            position: pos,
            type: authTypes[index]?.strategy || 'unknown',
            connectionId: authTypes[index]?.connectionId || ''
          }));
        }
        
        // Update URL and reload page
        function updateGame(newRevealed, seed) {
          const params = new URLSearchParams();
          if (newRevealed.length > 0) {
            // Preserve reveal order so side panel lists in uncover order
            params.set('revealed', newRevealed.join(','));
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
        
        // Function to get display icon for auth type (image)
        function getAuthIcon(type) {
          var base = window.ICON_BASE || '';
          var srcMap = {
            google: base + '/images/files/google.png',
            facebook: base + '/images/files/facebook.png',
            email: base + '/images/files/email.png'
          };
          var src = srcMap[type];
          if (!src) {
            return '?';
          }
          return '<img src="' + src + '" alt="' + type + '" style="width:20px;height:20px;object-fit:contain;display:block;margin:0 auto;" />';
        }
        
        // Function to get auth type color
        function getAuthColor(type) {
          switch (type) {
            case 'google': return '#4285f4';
            case 'facebook': return '#1877f2';
            case 'email': return '#ff6b35';
            case 'microsoft': return '#00a1f1';
            case 'apple': return '#000000';
            case 'github': return '#333333';
            default: return '#666666';
          }
        }
        
        // Proper minesweeper cascade logic
        function getCascadeReveals(startCell, authMethods, currentRevealed = []) {
          const toReveal = new Set(currentRevealed);
          const processed = new Set();
          
          // If clicking on an auth method (mine), just reveal that cell
          const isStartCellAuth = authMethods.some(am => am.position === startCell);
          if (isStartCellAuth) {
            toReveal.add(startCell);
            return Array.from(toReveal);
          }
          
          // Always reveal the clicked cell first
          toReveal.add(startCell);
          
          // Check if the starting cell is empty (0 adjacent mines)
          const startAdjacency = calculateAdjacency(startCell, authMethods);
          
          // If starting cell has numbers (1-8), only reveal that cell
          if (startAdjacency > 0) {
            return Array.from(toReveal);
          }
          
          // If starting cell is empty (0), do flood fill
          const queue = [startCell];
          processed.add(startCell);
          
          while (queue.length > 0) {
            const cell = queue.shift();
            const row = Math.floor(cell / 8);
            const col = cell % 8;
            
            // Check all 8 neighbors
            for (let r = -1; r <= 1; r++) {
              for (let c = -1; c <= 1; c++) {
                if (r === 0 && c === 0) continue;
                
                const newRow = row + r;
                const newCol = col + c;
                
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                  const neighborCell = newRow * 8 + newCol;
                  
                  // Skip if already processed
                  if (processed.has(neighborCell)) continue;
                  
                  // Skip if it's an auth method
                  const isNeighborAuth = authMethods.some(am => am.position === neighborCell);
                  if (isNeighborAuth) continue;
                  
                  // Mark as processed and reveal
                  processed.add(neighborCell);
                  toReveal.add(neighborCell);
                  
                  // Check neighbor's adjacency count
                  const neighborAdjacency = calculateAdjacency(neighborCell, authMethods);
                  
                  // Only add to queue if neighbor is also empty (for further cascading)
                  if (neighborAdjacency === 0) {
                    queue.push(neighborCell);
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
          
          // Update counter - use dynamic connection count
          const counter = document.querySelector('.msw-counter');
          const totalConnections = window.KINDE_CONNECTIONS ? window.KINDE_CONNECTIONS.length : 3;
          if (counter) {
            counter.textContent = String(totalConnections - revealedAuthMethods.length).padStart(3, '0');
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
                cell.style.backgroundColor = getAuthColor(authMethod.type);
                cell.style.color = 'white';
                cell.style.fontWeight = 'bold';
                cell.style.fontSize = '20px';
                cell.innerHTML = getAuthIcon(authMethod.type);
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
          
          // Remove in-dialog auth methods list - now only shown in right sidebar
        }
        
        // Helpers to build icon src and auth href
        function buildIconSrc(type) {
          var base = window.ICON_BASE || '';
          if (type === 'google') return base + '/images/files/google.png';
          if (type === 'facebook') return base + '/images/files/facebook.png';
          if (type === 'email') return base + '/images/files/email.png';
          return '';
        }

        function buildAuthHref(connectionId) {
          try {
            var base = window.CUSTOM_DOMAIN || '';
            var url = new URL('/api/auth/login', base);
            url.searchParams.set('connection_id', connectionId);
            return url.toString();
          } catch (e) {
            return (window.CUSTOM_DOMAIN || '') + '/api/auth/login?connection_id=' + encodeURIComponent(connectionId);
          }
        }

        // Render right-side auth panel with buttons and email input
        function renderSidePanel(revealedAuthMethods) {
          var side = document.querySelector('.msw-side-panel');
          if (!side) {
            side = document.createElement('div');
            side.className = 'msw-side-panel';
            side.style.position = 'fixed';
            side.style.top = '50%';
            side.style.right = '24px';
            side.style.transform = 'translateY(-50%)';
            side.style.width = '320px';
            side.style.background = 'rgba(255,255,255,0.15)';
            side.style.borderRadius = '12px';
            side.style.padding = '20px';
            side.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            side.style.backdropFilter = 'blur(8px)';
            side.style.border = '1px solid rgba(255,255,255,0.2)';
            side.style.zIndex = '1000';
            side.style.fontFamily = 'Tahoma, Arial, sans-serif';
            document.body.appendChild(side);
          }

          // Clear and rebuild side panel content with DOM API
          while (side.firstChild) side.removeChild(side.firstChild);
          
          // Add header with disclaimer
          var header = document.createElement('div');
          header.style.color = '#fff';
          header.style.fontSize = '14px';
          header.style.marginBottom = '16px';
          header.style.textAlign = 'center';
          header.style.opacity = '0.9';
          if (!revealedAuthMethods || revealedAuthMethods.length === 0) {
            header.textContent = '🕵️ Login methods will magically appear here as you uncover them in the minefield!';
          } else {
            header.textContent = '🎯 Found ' + revealedAuthMethods.length + ' login method' + (revealedAuthMethods.length === 1 ? '' : 's') + '!';
          }
          side.appendChild(header);
          
          if (!revealedAuthMethods || revealedAuthMethods.length === 0) return;

          // Order connections by the order they were uncovered
          var ordered = revealedAuthMethods.map(function (am) {
            return window.KINDE_CONNECTIONS.find(function(c){return c.id === am.connectionId;});
          }).filter(Boolean);

          ordered.forEach(function (conn) {
            if (conn.strategy === 'email') {
              var row = document.createElement('div');
              row.className = 'msw-auth-row';
              row.style.display = 'flex';
              row.style.alignItems = 'center';
              row.style.gap = '8px';
              row.style.marginBottom = '12px';

              var img = document.createElement('img');
              img.src = buildIconSrc('email');
              img.alt = 'Email';
              img.style.width = '20px';
              img.style.height = '20px';
              img.style.objectFit = 'contain';

              var input = document.createElement('input');
              input.id = 'msw-email-input';
              input.type = 'email';
              input.placeholder = 'you@example.com';
              input.style.flex = '1';
              input.style.padding = '8px 10px';
              input.style.border = '1px solid #ccc';
              input.style.borderRadius = '6px';

              var btn = document.createElement('button');
              btn.id = 'msw-email-btn';
              btn.textContent = 'Login';
              btn.style.padding = '10px 16px';
              btn.style.border = 'none';
              btn.style.borderRadius = '8px';
              btn.style.background = '#3b82f6';
              btn.style.color = '#fff';
              btn.style.cursor = 'pointer';
              btn.style.fontSize = '14px';
              btn.style.fontWeight = '500';

              row.appendChild(img);
              row.appendChild(input);
              row.appendChild(btn);
              side.appendChild(row);
            } else {
              var label = conn.strategy.charAt(0).toUpperCase() + conn.strategy.slice(1);
              var a = document.createElement('a');
              a.href = buildAuthHref(conn.id);
              a.className = 'msw-auth-row';
              a.style.display = 'flex';
              a.style.alignItems = 'center';
              a.style.gap = '12px';
              a.style.marginBottom = '12px';
              a.style.textDecoration = 'none';

              var img2 = document.createElement('img');
              img2.src = buildIconSrc(conn.strategy);
              img2.alt = label;
              img2.style.width = '20px';
              img2.style.height = '20px';
              img2.style.objectFit = 'contain';

              var div = document.createElement('div');
              div.style.flex = '1';
              div.style.padding = '10px 12px';
              div.style.border = '1px solid rgba(255,255,255,0.3)';
              div.style.borderRadius = '8px';
              div.style.background = 'rgba(255,255,255,0.08)';
              div.style.color = '#fff';
              div.style.fontFamily = 'Tahoma, Arial, sans-serif';
              div.textContent = 'Sign in with ' + label;

              a.appendChild(img2);
              a.appendChild(div);
              side.appendChild(a);
            }
          });

          var emailBtn = document.getElementById('msw-email-btn');
          var emailInput = document.getElementById('msw-email-input');
          var emailConn = ordered.find(function(c){return c.strategy==='email';});
          if (emailBtn && emailInput && emailConn) {
            emailBtn.addEventListener('click', function (e) {
              e.preventDefault();
              var v = (emailInput.value || '').trim();
              if (!v) return;
              var href = buildAuthHref(emailConn.id) + '&login_hint=' + encodeURIComponent(v);
              window.location.href = href;
            });
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
        
        // Render side panel only when something is revealed
        (function syncSidePanel() {
          const { revealed, seed } = getUrlParams();
          const authMethods = generateAuthMethods(seed);
          const revealedAuthMethods = authMethods.filter(am => revealed.includes(am.position));
          renderSidePanel(revealedAuthMethods);
        })();

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
