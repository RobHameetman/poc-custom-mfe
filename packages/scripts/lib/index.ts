import { build, serve, test } from './cmd';
import { BuildEnvs, NODE_ENV } from './utils';

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled
 * will terminate the Node.js process with a non-zero exit code.
 */
process.on('unhandledRejection', (err) => {
  throw err;
});

try {
  (async (): Promise<void> => {
    const script = process.argv[2];

    if (script) {
      switch (script) {
        case 'build':
          await build(NODE_ENV);
          break;
        case 'dev':
          await serve(BuildEnvs.development);
          break;
        case 'start':
          await serve(BuildEnvs.production);
          break;
        case 'test':
          await test();
          break;
        default:
          break;
      }
    }
  })();
} catch (err) {
  console.error(err instanceof Error ? err : new Error(err));
}
