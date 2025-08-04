import { Optional } from "./types";

export interface Builder<T> {
  init(): Builder<T>;
  set<K extends keyof T>(key: K, value: () => T[K]): Builder<T>;
  build(): Optional<T>;
}

export abstract class ObjectBuilder<T> implements Builder<T> {
  private setters: ((arg: T) => void)[] = [];
  private newDefault: () => T;

  constructor(newDefault: () => T) {
    this.newDefault = newDefault;
  }

  public abstract init(): ObjectBuilder<T>;

  public of(newDefault: () => T): ObjectBuilder<T> {
    this.newDefault = newDefault;
    return this;
  }

  public set<K extends keyof T>(key: K, value: () => T[K]): ObjectBuilder<T> {
    this.setters.push((obj: T) => {
      obj[key] = value();
    });
    return this;
  }

  public build(): Optional<T> {
    const user = this.newDefault();
    this.setters.forEach(set => set(user));
    return user;
  }
}