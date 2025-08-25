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
  .msw-login-container { display:flex; gap:80px; align-items:center; justify-content:center; padding: 40px; min-height:100vh; }
  .msw-left { display:flex; flex-direction:column; align-items:center; gap:20px; }
  .msw-subtitle { color:#fff; font-size:18px; text-align:center; margin-bottom:20px; text-shadow:1px 1px 2px rgba(0,0,0,.5); }

  .msw-game { background:#c0c0c0; border:4px outset #c0c0c0; padding:15px; border-radius:0; box-shadow: 4px 4px 8px rgba(0,0,0,.3); }
  .msw-game-header { background:#c0c0c0; padding:8px 12px; border:2px inset #c0c0c0; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; }
  .msw-counter { background:#000; color:#ff0000; font-family:'Courier New', monospace; font-size:20px; font-weight:700; padding:4px 8px; border:2px inset #c0c0c0; min-width:50px; text-align:center; }
  .msw-reset { width:40px; height:32px; background:#c0c0c0; border:2px outset #c0c0c0; font-size:20px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
  .msw-reset:active { border:2px inset #c0c0c0; }
  .msw-field { display:grid; grid-template-columns: repeat(8, 25px); grid-auto-rows:25px; gap:0; background:#c0c0c0; border:3px inset #c0c0c0; padding:3px; }
  .msw-field-static { display:grid; grid-template-columns: repeat(8, 25px); grid-auto-rows:25px; gap:0; background:#c0c0c0; border:3px inset #c0c0c0; padding:3px; }
  .msw-cell { width:25px; height:25px; background:#c0c0c0; border:1px outset #c0c0c0; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; }
  .msw-cell.revealed { border:1px solid #808080; background:#c0c0c0; }
  .msw-cell.auth { background:#000; color:#fff; font-size:8px; text-align:center; line-height:1; border:1px solid #808080; }
  .msw-found { color:#fff; font-size:16px; margin-top:20px; text-align:center; text-shadow:1px 1px 2px rgba(0,0,0,.5); }

  .msw-right { display:flex; flex-direction:column; gap:20px; }
  .msw-auth { margin-bottom:12px; }
  .msw-oauth { 
    display:flex; 
    align-items:center; 
    gap:16px; 
    padding:16px 24px; 
    background:linear-gradient(180deg, #0078D4 0%, #106EBE 100%); 
    border:2px outset #0078D4; 
    border-radius:8px; 
    color:#fff; 
    font-size:18px; 
    font-weight:600; 
    text-decoration:none; 
    min-width:280px; 
    transition:all .2s; 
    box-shadow:2px 2px 4px rgba(0,0,0,.3);
  }
  .msw-oauth:hover { 
    background:linear-gradient(180deg, #106EBE 0%, #0078D4 100%); 
    border:2px outset #106EBE; 
  }
  .msw-oauth:active { border:2px inset #0078D4; }
  .msw-oauth-icon { 
    width:40px; 
    height:40px; 
    border-radius:6px; 
    background:#fff; 
    display:flex; 
    align-items:center; 
    justify-content:center; 
    font-size:20px; 
  }
  .msw-oauth.google .msw-oauth-icon { background:#fff; color:#4285f4; }
  .msw-oauth.facebook .msw-oauth-icon { background:#1877f2; color:#fff; }
  .msw-oauth.email .msw-oauth-icon { background:#ffa500; color:#fff; }

  .msw-email-form { margin-top: 10px; }
  .msw-fieldset { margin-bottom: 10px; }
  .msw-fieldset label { display:block; margin-bottom:5px; font-size:12px; color:#fff; text-shadow:1px 1px 2px rgba(0,0,0,.5); }
  .msw-fieldset input { width:100%; padding:8px; border:2px inset #c0c0c0; font-size:12px; }
  .msw-submit { width:100%; padding:12px; background:linear-gradient(180deg, #0078D4 0%, #106EBE 100%); color:#fff; border:2px outset #0078D4; cursor:pointer; font-size:14px; font-weight:600; border-radius:4px; }
  .msw-submit:hover { background:linear-gradient(180deg, #106EBE 0%, #0078D4 100%); }
  .msw-submit:active { border:2px inset #0078D4; }
  .msw-center { text-align:center; margin-top:10px; }
  .msw-link { font-size:12px; color:#fff; text-decoration: underline; text-shadow:1px 1px 2px rgba(0,0,0,.5); }

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
