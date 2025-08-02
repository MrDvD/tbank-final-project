import postgres from "postgres";
import { CrudSelectorBuilder, CrudWorker } from "../abstracts/cruds";
import { NewsUser } from "../objects/database";
import { Optional } from "../abstracts/types";

export class NewsUserWorker implements CrudWorker<NewsUser, number> {
  private sql: postgres.Sql;
  
  constructor(sql: postgres.Sql) {
    this.sql = sql;
  }

  public add(obj: NewsUser): Optional<NewsUser> {
    return null;
  }
  
  public get(id: number): Optional<NewsUser>;
  public get(selector: CrudSelectorBuilder): Set<NewsUser>;
  public get(param: number | CrudSelectorBuilder): Optional<NewsUser> | Set<NewsUser> {
    if (typeof param === "number") {
      return null;
    } else {
      return new Set();
    }
  }
  
  public update(id: number, obj: NewsUser): Optional<NewsUser> {
    return null;
  }
  
  public remove(id: number): void {
    return;
  }
}