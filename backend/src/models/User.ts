class User {
  private userId: string | null;
  private name: string;
  private email: string;
  private password: string;
  private role: number | null;

  constructor(
    name: string,
    email: string,
    password: string,
    role?: number,
    userId?: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.userId = userId;
  }

  getID(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): number {
    return this.role;
  }

  setID(newId: string) {
    this.userId = newId;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setEmail(newEmail: string) {
    this.email = newEmail;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }

  setRole(new_role: number) {
    this.role = new_role;
  }
}

export { User };
