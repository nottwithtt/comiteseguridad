import { UserDAO } from "../daos/UserDAO";

class UserAdmin {
  private userDAO: UserDAO = new UserDAO();

  constructor() {}

  // Verifica si existe el usuario con el email del parámetro
  public async userExists(email: string) {
    const user = await this.userDAO.getUserByEmail(email);
    const result = user ? true : false;
    return result;
  }
}

export { UserAdmin };
