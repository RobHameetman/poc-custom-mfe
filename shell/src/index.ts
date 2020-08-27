import { registerApplication } from '../../packages/skeleton/src';

const IMPORT_PATHS = {
  shell: 'http://localhost:3000/static/js/main.chunk.js',
};

registerApplication(
  'shell',
  (): Promise<unknown> => System.import(IMPORT_PATHS.shell),
  (route: string): boolean => location.pathname.startsWith(route),
);
