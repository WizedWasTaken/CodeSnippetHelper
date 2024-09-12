export class User {
    private userId: number;
    private name: string;
    private email: string;
    private password: string;

    constructor(userId: number, name: string, email: string, password: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public get UserId(): number {
        return this.userId;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public get Email(): string {
        return this.email;
    }

    public set Email(email: string) {
        if (!this.verifyEmail(email)) {
            throw new Error("Invalid email");
        }
        this.email = email;
    }

    public get Password(): string {
        return this.password;
    }

    public set Password(password: string) {
        this.password = password;
    }

    private verifyEmail(email: string): boolean {
        return email.includes("@");
    }

    public verifyPassword(password: string): boolean {
        return password.length >= 8;
    }

    public verifyUser(email: string, password: string): boolean {
        return this.email === email && this.password === password;
    }

    public verifyUserObj(user: User): boolean {
        return this.email === user.Email && this.password === user.Password;
    }
}
