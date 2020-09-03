export interface StandardError<T extends string = string, C extends number = number>
  extends Readonly<Error> {
  readonly code: C;
  readonly name: T;
}
