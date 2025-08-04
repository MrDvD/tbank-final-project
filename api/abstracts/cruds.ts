import { Optional } from "./types";

export interface CrudWorker<T, UID> {
  add(obj: T): Promise<Optional<T>>;
  get(selector: CrudSelectorBuilder): Promise<Set<T>>;
  update(id: UID, obj: T): Promise<Optional<T>>;
  remove(id: UID): Promise<void>;
}

export interface CrudSelectorBuilder {
  init(): CrudSelectorBuilder;
  select(attr: string, value: string): CrudSelectorBuilder;
  build(): string;
}