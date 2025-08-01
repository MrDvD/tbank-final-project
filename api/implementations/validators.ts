import { Checker, CheckerResult } from "../abstracts/checkers";

type LoginPassword = { login: string, password: string };

// class LoginPasswordChecker implements Checker<LoginPassword> {
//   private worker: CrudWorker;

//   constructor(worker: CrudWorker) {
//     this.worker = worker;
//   }

//   // check(pair: LoginPassword): CheckerResult {

//   // }
// }