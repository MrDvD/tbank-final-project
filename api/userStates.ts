import { Optional } from "./abstracts/types";

abstract class UserState {
  abstract handle(cookies: Map<string, string>): Optional<UserState>;
}

class UserUnauthenticatedState extends UserState {
  public handle(cookies: Map<string, string>): Optional<UserState> {
    return null;
  }
}

class UserAuthorizedState extends UserState {
  private readonly userId: number;

  constructor(userId: number) {
    super();
    this.userId = userId;
  }

  public handle(cookies: Map<string, string>): Optional<UserState> {
    return null;
  }

  public getUserId() {
    return this.userId;
  }
}