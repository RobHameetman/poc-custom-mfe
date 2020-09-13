declare interface Window {
  $events: Array<unknown>;
  JSX: typeof JSX.createElement;
}

window.$events = window.$events || [];
