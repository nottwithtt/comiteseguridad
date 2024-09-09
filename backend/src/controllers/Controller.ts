import { UserAdmin } from "./UserAdmin";

class Controller {
  private static instance: Controller | null = null;
  private userAdmin: UserAdmin = new UserAdmin();

  private constructor() {
  }

  public static getInstance(): Controller {
    if (!Controller.instance) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }

  // Verifica si existe el usuario con el email del parámetro
  public async userExists(email: string) {
    return await this.userAdmin.userExists(email);
  }
}

export { Controller };
