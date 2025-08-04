import { Optional } from "./types";

/**
 * Interface for a generic builder pattern.
 *
 * @template T The type of object to be built.
 */
export interface Builder<T> {
  /**
   * Initializes the builder, returning a new instance.
   *
   * @returns {Builder<T>} A new instance of the builder.
   */
  init(): Builder<T>;

  /**
   * Sets a property on the object being built.
   *
   * @param key - The property key to set.
   * @param value - A function returning the value to set for the property.
   * @returns {Builder<T>} The builder instance for chaining.
   */
  set<K extends keyof T>(key: K, value: () => T[K]): Builder<T>;

  /**
   * Constructs and returns an Optional containing the built object.
   *
   * @returns {Optional<T>} The built object wrapped in Optional.
   */
  build(): Optional<T>;
}

/**
 * Abstract base class for building objects of type `T` using the builder pattern.
 * 
 * Implements the {@link Builder} interface.
 * 
 * @template T - The type of object to build.
 */
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