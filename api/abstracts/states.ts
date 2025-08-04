import { Endpoint, Optional } from "./types";

export abstract class AppState {
  private context: AppContext;

  constructor(context: AppContext) {
    this.context = context;
  }


}

/**
 * Represents the web application context, providing methods for navigation and state management.
 */
export interface AppContext {
  /**
   * Navigates to the specified endpoint and updates the application state as needed.
   * @param endpoint The endpoint to navigate to.
   * @returns The new application state if navigation is successful, or null otherwise.
   */
  navitageTo(endpoint: Endpoint): Optional<AppState>;
  /**
   * Returns the current application state.
   */
  getState(): AppState;
}

// export abstract class CookieAppContext implements AppContext {
//   public navitageTo(endpoint: Endpoint): Optional<AppState> {
//     return null;
//   }

//   public getState(): AppState {
//     // return null;
//   }
// }