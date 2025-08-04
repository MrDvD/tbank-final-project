import { Checker, CheckerResult } from "./checkers";

// Validator is a combination of independent Checkers chained together
// WIP
export interface Validator<T> {
  check<O = keyof T>(getter: (object: O) => any, checker: Checker<O>): Validator<T>;

  validate(object: T): CheckerResult;
}
