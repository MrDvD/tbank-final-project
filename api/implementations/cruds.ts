import postgres from "postgres";
import { CrudSelectorBuilder, CrudWorker } from "../abstracts/cruds";
import { NewsUser } from "../objects/database";
import { Optional } from "../abstracts/types";

export class NewsUserWorker implements CrudWorker<NewsUser, number> {
  private sql: postgres.Sql;
  
  constructor(sql: postgres.Sql) {
    this.sql = sql;
  }

  public add(obj: NewsUser): Promise<Optional<NewsUser>> {
    return this.sql<NewsUser[]>`
      insert into USERS(login, full_name, password, description, photo_link)
        values (${obj.login}, ${obj.full_name}, ${obj.password}, ${obj.description}, ${obj.photo_link})
        returning *;
    `.then(result => result[0] ? result[0] : null);
  }

  public get(selector: CrudSelectorBuilder): Promise<Set<NewsUser>> {
    return this.sql<NewsUser[]>`
      select * from USERS
        where ${selector.build()};
    `.then(result => new Set(result));
  }
  
  public update(id: number, obj: NewsUser): Promise<Optional<NewsUser>> {
    return this.sql<NewsUser[]>`
      update USERS
      set login = ${obj.login}, full_name = ${obj.full_name}, password = ${obj.password}, description = ${obj.description}, photo_link = ${obj.photo_link}
      where user_id = ${id}
      returning *;
    `.then(result => result[0] ? result[0] : null);
  }

  public remove(id: number): Promise<void> {
    return this.sql`
      delete from USERS
      where user_id = ${id};
    `.then(() => {});
  }
}

export class PostgresSelectorBuilder implements CrudSelectorBuilder {
  private conditions: string[] = [];

  public init(): CrudSelectorBuilder {
    return new PostgresSelectorBuilder();
  }

  public select(attr: string, value: string): CrudSelectorBuilder {
    this.conditions.push(`${attr} = ${value}`);
    return this;
  }

  public build(): string {
    return this.conditions.join(" AND ");
  }
}