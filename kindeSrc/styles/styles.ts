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
  @font-face {
    font-family: Instrument Sans;
    src: url(https://asset.kindedemo.com/evolve-ai/InstrumentSans-VariableFont_wdth,wght.ttf);
  }

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

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
  }

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
  .xp-window {
    width: 520px;
    border: 2px solid #000;
    border-right-color: #3f3f3f;
    border-bottom-color: #3f3f3f;
    background: #bfbfbf;
    box-shadow: inset 2px 2px 0 #fff, inset -2px -2px 0 #7f7f7f;
    font-family: Tahoma, Verdana, sans-serif;
  }
  .xp-titlebar {
    background: #0a47a1;
    color: #fff;
    padding: 8px 12px;
    font-weight: 700;
    letter-spacing: .5px;
  }
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
