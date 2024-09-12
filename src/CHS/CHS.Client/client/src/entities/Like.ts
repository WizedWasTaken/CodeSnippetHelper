import { User } from "./User";
import { Snippet } from "./Snippet";

export class Like {
    private likeId: number;
    private user: User;
    private snippet: Snippet;

    constructor(likeId: number, user: User, snippet: Snippet) {
        this.likeId = likeId;
        this.user = user;
        this.snippet = snippet;
    }

    public get LikeId(): number {
        return this.likeId;
    }

    public set LikeId(id: number) {
        this.likeId = id;
    }

    public get User(): User {
        return this.user;
    }

    public set User(user: User) {
        this.user = user;
    }

    public get Snippet(): Snippet {
        return this.snippet;
    }

    public set Snippet(snippet: Snippet) {
        this.snippet = snippet;
    }
}
