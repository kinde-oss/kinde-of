// CSS Variables configuration
const kindeVariables = {
  baseFontFamily:
    'Instrument Sans, -apple-system, system-ui, BlinkMacSystemFont, Helvetica, Arial, Segoe UI, Roboto, sans-serif',
  controlSelectTextBorderRadius: '1rem',
  buttonPrimaryBackgroundColor: '#C1AFEF',
  buttonPrimaryColor: '#f5f5f5',
  buttonBorderRadius: '1rem',
  buttonSecondaryBackgroundColor: '#2B2B2B',
  buttonSecondaryBorderWidth: '1px',
  buttonSecondaryBorderColor: '#2B2B2B',
  buttonSecondaryBorderStyle: 'solid',
  buttonSecondaryBorderRadius: '1rem',
} as const;

export const getStyles = (): string => `
  :root {
    --kinde-base-font-family: ${kindeVariables.baseFontFamily};
    --kinde-control-select-text-border-radius: ${kindeVariables.controlSelectTextBorderRadius};
    --kinde-button-primary-background-color: ${kindeVariables.buttonPrimaryBackgroundColor};
    --kinde-button-primary-color: ${kindeVariables.buttonPrimaryColor};
    --kinde-button-border-radius: ${kindeVariables.buttonBorderRadius};
    --kinde-button-secondary-border-width: ${kindeVariables.buttonSecondaryBorderWidth};
    --kinde-button-secondary-border-style: ${kindeVariables.buttonSecondaryBorderStyle};
    --kinde-button-secondary-border-radius: ${kindeVariables.buttonSecondaryBorderRadius};
    --kinde-control-label-color: #fff;
    --kinde-button-font-weight: 700;
    --kinde-control-select-text-border-color: #636363;
    --kinde-button-primary-border-width: 0;
    --kinde-designer-base-link-color: #fff;
  }

  [data-kinde-control-label] {
    font-weight: 700;
  }

  [data-kinde-choice-separator] { 
    color: #ABABAB;
  }

  [data-kinde-button-variant=primary] { 
    background: linear-gradient(90deg, #467BE6 30.32%, #212581 100%);
  }

  .kinde-branding a {
    color: #fff;
  }

  .footer {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .terms {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .footer a {
    font-weight: 500;
    color: #dbdbdb;
    text-decoration: none;
  }

  .header { display:none; }

  .login-form {
    max-width: 496px;
    width: 100%;
    margin: 0 auto;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    height: 100%;
    background: transparent;
  }

  /* minesweeper styles */
  .msw-login-container { display:flex; gap:36px; align-items:center; justify-content:center; padding: 24px 28px; background: rgba(0,0,0,.15); border-radius: 28px; box-shadow: 0 30px 80px rgba(0,0,0,.25) inset, 0 8px 30px rgba(0,0,0,.25); }
  .msw-left { display:flex; flex-direction:column; align-items:center; gap:16px; padding:12px; }
  .msw-logo { color:#fff; font-size:54px; font-weight:800; letter-spacing: .5px; text-shadow: 0 2px 0 #173d8f, 0 4px 12px rgba(0,0,0,.45); }
  .msw-subtitle { color:#eaf1ff; font-size:18px; text-align:center; text-shadow:0 1px 0 rgba(0,0,0,.4); }

  .msw-game { background:#c0c0c0; border:3px outset #c0c0c0; padding:20px; border-radius:6px; box-shadow: inset 2px 2px 0 #fff,inset -2px -2px 0 #7d7d7d, 0 10px 30px rgba(0,0,0,.25); }
  .msw-game-header { background:#c0c0c0; padding:10px; border:2px inset #c0c0c0; margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; box-shadow: inset 2px 2px 0 #fff,inset -2px -2px 0 #7d7d7d; }
  .msw-counter { background:#000; color:#f00; font-family:'Courier New', monospace; font-size:18px; font-weight:700; padding:5px 10px; border:1px inset #c0c0c0; }
  .msw-reset { width:30px; height:30px; background:#c0c0c0; border:2px outset #c0c0c0; font-size:16px; cursor:pointer; }
  .msw-reset:active { border:2px inset #c0c0c0; }
  .msw-field { display:grid; grid-template-columns: repeat(8, 30px); grid-auto-rows:30px; gap:1px; background:#808080; border:2px inset #c0c0c0; padding:5px; box-shadow: inset 2px 2px 0 #fff,inset -2px -2px 0 #7d7d7d; }
  .msw-cell { width:30px; height:30px; background:#c0c0c0; border:2px outset #c0c0c0; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:12px; font-weight:700; transition:all .06s; }
  .msw-cell:hover { background:#d0d0d0; }
  .msw-cell.revealed { border:1px inset #c0c0c0; background:#d0d0d0; }
  .msw-cell.auth { background:#90EE90; border:2px inset #c0c0c0; font-size:10px; color:#333; padding:2px; text-align:center; line-height:1.2; }
  .msw-found { color:#fff; font-size:12px; margin-top:10px; text-align:center; }

  .msw-right { display:flex; flex-direction:column; align-items:center; gap:14px; padding:10px; background: rgba(255,255,255,0.12); backdrop-filter: blur(12px); border-radius: 16px; box-shadow: inset 0 2px 0 rgba(255,255,255,.25), inset 0 -2px 0 rgba(0,0,0,.2); }
  .msw-welcome { color:#fff; font-size:26px; text-shadow:0 2px 0 #173d8f, 0 4px 12px rgba(0,0,0,.45); }
  .msw-instructions { color:#eaf1ff; font-size:14px; text-align:center; text-shadow:0 1px 0 rgba(0,0,0,.35); line-height:1.4; }
  .msw-panel { background: rgba(255,255,255,0.95); border: 2px outset #c0c0c0; border-radius:10px; padding:22px; min-width:320px; box-shadow: 0 10px 30px rgba(0,0,0,.25); }
  .msw-auth { display:block; }
  .msw-auth-title { font-size:18px; font-weight:700; margin-bottom:14px; text-align:center; color:#333; }
  .msw-oauth { width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:4px; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:10px; font-size:14px; transition: all .2s; }
  .msw-oauth:hover { background:#f5f5f5; border-color:#ccc; }
  .msw-oauth.google { border-color:#4285f4; color:#4285f4; }
  .msw-oauth.facebook { border-color:#1877f2; color:#1877f2; }
  .msw-email-form { margin-top: 10px; }
  .msw-fieldset { margin-bottom: 10px; }
  .msw-fieldset label { display:block; margin-bottom:5px; font-size:12px; color:#333; }
  .msw-fieldset input { width:100%; padding:8px; border:1px inset #c0c0c0; font-size:12px; }
  .msw-submit { width:100%; padding:10px; background:#316AC5; color:#fff; border:1px outset #316AC5; cursor:pointer; font-size:12px; }
  .msw-submit:hover { background:#4A7BC8; }
  .msw-submit:active { border:1px inset #316AC5; }
  .msw-muted { text-align:center; color:#666; font-size:14px; }
  .msw-hint { font-size:11px; color:#666; text-align:center; margin-top:10px; }
  .msw-center { text-align:center; margin-top:10px; }
  .msw-link { font-size:11px; color:#316AC5; text-decoration: underline; }

  /* legacy xp styles kept for other parts of the app */
  .xp-window {
    width: 780px;
    border: 2px solid #000;
    border-right-color: #3f3f3f;
    border-bottom-color: #3f3f3f;
    background: linear-gradient(#1b62cd, #0d58c3 60px, #bfbfbf 60px, #bfbfbf);
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    font-family: Tahoma, Verdana, sans-serif;
  }
  .xp-titlebar { display:none; }
  .xp-content { padding: 16px; }

  .xp-split {
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 16px;
    align-items: start;
  }

  .xp-statusbar {
    display: grid;
    grid-template-columns: 64px 1fr 64px;
    align-items: center;
    gap: 12px;
    background: #c0c0c0;
    padding: 8px;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    margin-bottom: 10px;
  }
  .xp-counter {
    background: #000;
    color: #f00;
    font-weight: 700;
    font-family: 'Digital-7', monospace;
    text-align: center;
    padding: 6px 8px;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #3f3f3f, inset -2px -2px 0 #000;
  }
  .xp-smiley {
    background: #c0c0c0;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    width: 38px; height: 38px; border-radius: 4px; cursor: pointer;
  }

  .xp-board {
    display: grid;
    grid-template-columns: repeat(4, 48px);
    grid-auto-rows: 48px;
    gap: 6px;
    background: #bdbdbd;
    padding: 10px;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
  }

  .xp-cell {
    appearance: none;
    background: #c0c0c0;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
  }
  .xp-cell-open {
    background: #e5e5e5;
    box-shadow: inset 1px 1px 0 #7f7f7f, inset -1px -1px 0 #fff;
    cursor: default;
  }
  .xp-num { font-weight: 700; font-size: 18px; }

  .xp-button {
    background: #e1e1e1;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    padding: 6px 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .xp-provider { display: grid; justify-items: center; gap: 6px; }
  .xp-provider-name { font-weight: 700; font-size: 12px; }
  .xp-provider-btn { font-size: 12px; }

  .xp-panel {
    background: #c0c0c0;
    border: 2px solid #7f7f7f;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    padding: 10px;
  }
  .xp-panel-title { font-weight: 700; margin-bottom: 8px; }
  .xp-options { display: grid; gap: 10px; }
  .xp-option { display: grid; gap: 6px; justify-items: start; align-content: start; padding: 6px; background:#d6d6d6; box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #7f7f7f; }
  .xp-option-name { font-weight: 700; font-size: 12px; }

  /* user tile */
  .xp-user-tile {
    display: grid;
    grid-template-rows: 72px auto;
    gap: 8px;
    width: 180px;
    justify-items: center;
    padding: 10px;
    background: linear-gradient(#2e6bd0, #2b59a1);
    color: #fff;
    border: 2px solid #0b3b89;
    box-shadow: inset 2px 2px 0 rgba(255,255,255,.25), inset -2px -2px 0 rgba(0,0,0,.25);
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
  }
  .xp-user-tile:hover { filter: brightness(1.05); }
  .xp-user-avatar { display:grid; place-items:center; width:72px; height:72px; background:#1d4fb7; border-radius: 6px; box-shadow: inset 1px 1px 0 rgba(255,255,255,.25), inset -1px -1px 0 rgba(0,0,0,.25); }
  .xp-user-name { font-weight: 700; }

  .xp-ms { display:grid; grid-template-columns: repeat(2,9px); grid-auto-rows: 9px; gap:2px; }
  .xp-ms > span { display:block; width:9px; height:9px; }
  .xp-email { font-size: 16px; }

  @media (min-width: 768px) { 
    .image-header {
      height: 200px;
      margin-bottom: 1.5rem;
    }

    .login-form {
      background: rgba(0, 0, 0, 0.2);
    }
  }
`;
