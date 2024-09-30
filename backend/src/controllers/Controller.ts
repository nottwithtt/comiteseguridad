import { UserAdmin } from "./UserAdmin";
import { EventAdmin } from "./EventAdmin";
import EventModel from "../models/Event";

class Controller {
  private static instance: Controller | null = null;
  private userAdmin: UserAdmin = new UserAdmin();
  private eventAdmin: EventAdmin = new EventAdmin();

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

  public async getEvent(id: string) {
    return await this.eventAdmin.getEvent(id);
  }

  public async createEvent(myevent: EventModel) {
    return await this.eventAdmin.createEvent(myevent);
  }

}

export { Controller };
