import { Language } from "./Language";
import { User } from "./User";

export class Snippet {
    private snippetId: number;
    private title: string;
    private code: string;
    private description: string;
    private likes: number;
    private createdBy: User;
    private language: Language;
    private createdOn: Date;

    constructor(snippetId: number, title: string, code: string, description: string, likes: number, createdBy: User, language: Language, createdOn: Date) {
        this.snippetId = snippetId;
        this.title = title;
        this.code = code;
        this.description = description;
        this.likes = likes;
        this.createdBy = createdBy;
        this.language = language;
        this.createdOn = createdOn;
    }

    public get SnippetId(): number {
        return this.snippetId;
    }

    public get Title(): string {
        return this.title;
    }

    public set Title(title: string) {
        this.title = title;
    }

    public get Code(): string {
        return this.code;
    }

    public set Code(code: string) {
        this.code = code;
    }

    public get Description(): string {
        return this.description;
    }

    public set Description(description: string) {
        this.description = description;
    }

    public get Likes(): number {
        return this.likes;
    }

    public set Likes(likes: number) {
        this.likes = likes;
    }

    public get CreatedBy(): User {
        return this.createdBy;
    }

    public set CreatedBy(user: User) {
        this.createdBy = user;
    }

    public get Language(): Language {
        return this.language;
    }

    public set Language(language: Language) {
        this.language = language;
    }

    public get CreatedOn(): Date {
        return this.createdOn;
    }

    public set CreatedOn(createdOn: Date) {
        this.createdOn = createdOn;
    }
}
