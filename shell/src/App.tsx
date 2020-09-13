import { FC } from '@microfrontend-example/core';

export interface AppProps {
  readonly urlRerouteOnly?: boolean;
}

export const App: FC<AppProps> = ({ urlRerouteOnly = false }) => {
  return <h1>Hello, world!</h1>;
};
