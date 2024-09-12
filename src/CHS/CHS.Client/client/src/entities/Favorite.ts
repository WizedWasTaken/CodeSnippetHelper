import { User } from "./User";
import { Snippet } from "./Snippet";

export class Favorite {
    private favoriteId: number;
    private user: User;
    private snippet: Snippet;

    constructor(favoriteId: number, user: User, snippet: Snippet) {
        this.favoriteId = favoriteId;
        this.user = user;
        this.snippet = snippet;
    }

    public get FavoriteId(): number {
        return this.favoriteId;
    }

    public set FavoriteId(id: number) {
        this.favoriteId = id;
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
