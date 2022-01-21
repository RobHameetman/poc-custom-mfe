import { RejectFn } from '../RejectFn';
import { ResolveFn } from '../ResolveFn';

export type AsyncDetail<T = {}> = T & {
  readonly resolve: ResolveFn;
  readonly reject: RejectFn;
};
