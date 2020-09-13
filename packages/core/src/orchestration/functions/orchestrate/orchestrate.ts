// import { App } from './../../components';
// import { isInBrowser } from '../isInBrowser';
// import { callHooks, rerouteUrlOnly, start } from '../../events';

// export interface OrchestrationOptions {
//   readonly urlRerouteOnly?: boolean;
// }

// export type OrchestrationFn = (opts: OrchestrationOptions) => void;

// const DEFAULT_OPTS: OrchestrationOptions = {
//   urlRerouteOnly: false,
// };

// export const orchestrate: OrchestrationFn = ({
//   urlRerouteOnly = false,
// } = DEFAULT_OPTS) => {
//   customElements.define('app', App);

//   start();

//   if (urlRerouteOnly) {
//     rerouteUrlOnly();
//   }

//   if (isInBrowser()) {
//     callHooks();
//   }
// };
