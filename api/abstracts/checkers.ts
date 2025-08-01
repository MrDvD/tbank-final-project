export interface Checker<T> {
  check(obj: T): CheckerResult;
}

export interface CheckerResult {
  getStatus(): CheckerStatus;
}

export enum CheckerStatus {
  CORRECT,
}