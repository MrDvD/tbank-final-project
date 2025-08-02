import { Checker, CheckerResult, CheckerStatus } from "../abstracts/checkers";
import { CrudWorker } from "../abstracts/cruds";

type LoginPassword = { login: string, password: string };

class LoginPasswordChecker implements Checker<LoginPassword> {
  private worker: CrudWorker<LoginPassword, number>;

  constructor(worker: CrudWorker<LoginPassword, number>) {
    this.worker = worker;
  }

  check(pair: LoginPassword): CheckerResult {
    return {
      getStatus: () => CheckerStatus.FAILURE,
    }
  }
}