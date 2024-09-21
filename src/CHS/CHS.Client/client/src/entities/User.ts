export class User {
    userId: number;
    name: string;
    email: string;
    password: string;
    createdOn?: Date;
  
    constructor(userId: number, name: string, email: string, password: string, createdOn?: Date) {
      this.userId = userId;
      this.name = name;
      this.email = email;
      this.password = password;
      this.createdOn = createdOn;
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
      return this.email === user.email && this.password === user.password;
    }
  }