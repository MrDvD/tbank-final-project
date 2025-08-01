import { Checker, CheckerResult } from "./checkers";

// Validator is a combination of independent Checkers chained together
export interface Validator<T> {
  check<Obj>(getter: (object: Obj) => any, checker: Checker<Obj>): Validator<T>;

  validate(object: T): CheckerResult;
}
