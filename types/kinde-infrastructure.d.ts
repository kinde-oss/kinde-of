declare module '@kinde/infrastructure' {
  export function getKindeCSRF(): string;
  export function getKindeRequiredCSS(): any;
  export function getKindeRequiredJS(): any;
  export function getSVGFaviconUrl(): string;
  export function getKindeWidget(): any;

  export type KindePageEvent = {
    context: any;
    request: any;
  };
}

declare module 'react-dom/server.browser' {
  export function renderToString(element: any): string;
  const _default: any;
  export default _default;
}
