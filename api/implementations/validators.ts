import { Checker, CheckerResult, CheckerStatus } from "../abstracts/checkers";
import { CrudSelectorBuilder, CrudWorker } from "../abstracts/cruds";
import { NewsUser } from "../objects/database";

type LoginPassword = { login: string, password: string };

// export class NewsUserChecker implements Checker<NewsUser> {
//   private worker: CrudWorker<NewsUser, number>;
//   private selector: CrudSelectorBuilder;

//   constructor(worker: CrudWorker<NewsUser, number>, selector: CrudSelectorBuilder) {
//     this.worker = worker;
//     this.selector = selector;
//   }

//   check(pair: LoginPassword): CheckerResult { // refactor logic
//     if (this.worker.get(this.selector) !== null) {
//       return { getStatus: () => CheckerStatus.SUCCESS };
//     } else {
//       return { getStatus: () => CheckerStatus.FAILURE };
//     }
//   }
// }