import { Language } from "./Language";
import { User } from "./User";

export class Snippet {
  snippetId?: number;
  title: string;
  code: string;
  description: string;
  likes: number;
  createdBy?: User;
  language: Language;
  createdOn: Date;

  constructor(
    snippetId: number | undefined,
    title: string,
    code: string,
    description: string,
    likes: number,
    language: Language,
    createdOn: Date,
    createdBy?: User
  ) {
    this.snippetId = snippetId;
    this.title = title;
    this.code = code;
    this.description = description;
    this.likes = likes;
    this.language = language;
    this.createdOn = createdOn;
    this.createdBy = createdBy;
  }
}