import { Optional } from "./types";

/**
 * Defines the contract for a generic CRUD (Create, Read, Update, Delete) worker
 * that operates on entities of type `T` identified by a unique identifier of type `UID`.
 *
 * @template T The type of the entity managed by the CRUD worker.
 * @template UID The type of the unique identifier for the entity.
 */
export interface CrudWorker<T, UID> {
  /**
   * Adds a new entity to the data store.
   * @param obj The entity object to add.
   * @returns A promise that resolves to an Optional containing the added entity.
   */
  add(obj: T): Promise<Optional<T>>;

  /**
   * Retrieves a set of entities matching the given selector.
   * @param selector The selector builder used to filter entities.
   * @returns A promise that resolves to a set of entities matching the selector.
   */
  get(selector: CrudSelectorBuilder): Promise<Set<T>>;

  /**
   * Updates an existing entity identified by the given ID.
   * @param id The unique identifier of the entity to update.
   * @param obj The updated entity object.
   * @returns A promise that resolves to an Optional containing the updated entity.
   */
  update(id: UID, obj: T): Promise<Optional<T>>;

  /**
   * Removes an entity identified by the given ID from the data store.
   * @param id The unique identifier of the entity to remove.
   * @returns A promise that resolves when the entity has been removed.
   */
  remove(id: UID): Promise<void>;
}

/**
 * Interface for building CRUD selector queries.
 */
export interface CrudSelectorBuilder {
  /**
   * Initializes and returns a new instance of the selector builder.
   * @returns A new CrudSelectorBuilder instance.
   */
  init(): CrudSelectorBuilder;

  /**
   * Adds a selection criterion to the builder.
   * @param attr - The attribute name to select by.
   * @param value - The value to match for the given attribute.
   * @returns The current instance of the CrudSelectorBuilder for chaining.
   */
  select(attr: string, value: string): CrudSelectorBuilder;

  /**
   * Builds and returns the final selector string.
   * @returns The constructed selector string.
   */
  build(): string;
}
