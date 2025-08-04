import { ObjectBuilder } from "../abstracts/builders";
import { NewsUser } from "../objects/database";

export class NewsUserBuilder extends ObjectBuilder<NewsUser> {
  constructor() {
    super(() => ({
      user_id: 0,
      login: "",
      full_name: "Unknown",
      password: "",
      description: "No description provided.",
      photo_link: "",
    }));
  }

  public init(): NewsUserBuilder {
    return new NewsUserBuilder();
  }
}