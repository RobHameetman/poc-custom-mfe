import { Config } from '@jest/types';
import { TestRunner } from '../../enums';
import { PackageJson } from '../PackageJson';

export type TestConfig = Record<string, unknown> | Config.InitialOptions;

export class TestBed {
  public runningTests = false;

  constructor(public readonly runner: TestRunner, packageJson: PackageJson) {
    switch (runner) {
      case TestRunner.cypress:
        break;
      case TestRunner.jest:
        break;
      default:
        break;
    }
  }

  start(): void {
    this.runningTests = true;
  }

  stop(): void {
    this.runningTests = false;
  }
}
