import { Optional } from "./types";

export interface CrudWorker<T, UID> {
  add(obj: T): Optional<T>;
  get(id: UID): Optional<T>;
  get(selector: CrudSelectorBuilder): Set<T>;
  update(id: UID, obj: T): Optional<T>;
  remove(id: UID): void;
}

export interface CrudSelectorBuilder {
  select(attr: string, value: string): CrudSelectorBuilder
  build(): string;
}