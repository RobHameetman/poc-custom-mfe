import { build, serve, test } from './cmd';
import { Cmds, NODE_ENV, NodeEnvs, Structures, isStructure, loadDotenv } from './utils';

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
    const structure = process.argv[2] || Structures.service;
    const cmd = process.argv[3] || Cmds.start;

    if (!isStructure(structure)) {
      throw Error(`Argument "${structure}" is not a valid structure`);
    }

    loadDotenv();

    if (cmd) {
      switch (cmd) {
        case 'build':
          await build(structure, NODE_ENV);
          break;
        case 'dev':
          await serve(structure, NodeEnvs.development);
          break;
        case 'start':
          await serve(structure, NodeEnvs.production);
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
