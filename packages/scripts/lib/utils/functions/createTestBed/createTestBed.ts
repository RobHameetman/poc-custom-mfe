import { importPackageJson } from '../importPackageJson';
import { TestBed } from '../../types';
import { TestRunner } from '../../enums/TestRunner';

export const createTestBed = async (): Promise<TestBed> => {
  const PACKAGE_JSON = await importPackageJson();

  if (!PACKAGE_JSON) {
    throw new Error('Could not find package.json');
  }

  return new TestBed(TestRunner.jest, PACKAGE_JSON);
};
