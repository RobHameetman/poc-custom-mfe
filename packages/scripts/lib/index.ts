import { build } from './build';
import { debug } from './debug';
import { dev } from './dev';
import { start } from './start';
import { test } from './test';

(async (): Promise<void> => {
  try {
    const script = process.argv[2];

    if (script) {
      switch (script) {
        case 'build':
          await build();
          break;
        case 'debug':
          await debug();
          break;
        case 'dev':
          await dev();
          break;
        case 'start':
          await start();
          break;
        case 'test':
          await test();
          break;
        default:
          break;
      }
    }

    console.log('Testing...');
  } catch (err) {
    console.error(err instanceof Error ? err : new Error(err));
  }
})();
