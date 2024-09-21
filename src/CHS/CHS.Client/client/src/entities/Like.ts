import { User } from "./User";
import { Snippet } from "./Snippet";

export class Like {
  likeId: number;
  user: User;
  snippet: Snippet;

  constructor(likeId: number, user: User, snippet: Snippet) {
    this.likeId = likeId;
    this.user = user;
    this.snippet = snippet;
  }
}