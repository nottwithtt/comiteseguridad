import { UserAdmin } from "./UserAdmin";
import { EventAdmin } from "./EventAdmin";
import { AcuerdoAdmin } from "./AcuerdoAdmin";
import EventModel from "../models/Event";

class Controller {
  private static instance: Controller | null = null;
  private userAdmin: UserAdmin = new UserAdmin();
  private eventAdmin: EventAdmin = new EventAdmin();
  private acuerdoAdmin: AcuerdoAdmin = new AcuerdoAdmin();

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

  public async updateEvent(myevent: EventModel) {
    return await this.eventAdmin.updateEvent(myevent);
  }

  public async deleteEvent(eventid: string) {
    return await this.eventAdmin.deleteEvent(eventid);
  }

  public async checkOverlap(myevent: EventModel){
    return await this.eventAdmin.checkOverlap(myevent);
  }

  public async createAcuerdo(
    numeroOrden: number,
    descripcion: string,
    estado: "pendiente" | "completado",
    eventoId: string // Add eventoId parameter
  ) {
    return await this.acuerdoAdmin.createAcuerdo(numeroOrden, descripcion, estado, eventoId);
  }

  public async updateAcuerdo(
    acuerdoId: string,
    numeroOrden: number,
    descripcion: string,
    estado: "pendiente" | "completado",

  ) {
    return await this.acuerdoAdmin.updateAcuerdo(acuerdoId, numeroOrden, descripcion, estado);
  }

  public async deleteAcuerdo(acuerdoId: string) {
    return await this.acuerdoAdmin.deleteAcuerdo(acuerdoId);
  }

  public async getAcuerdo(id: string) {
    return await this.acuerdoAdmin.getAcuerdo(id);
  }

  public async getAcuerdosByEventoId(eventoId: string) {
    return await this.acuerdoAdmin.getAcuerdosByEventoId(eventoId);
  }

  public async getAllAcuerdos() {
    return await this.acuerdoAdmin.getAllAcuerdos();
  }

  public async checkOrderNumberExists(numeroOrden: number) {
    return await this.acuerdoAdmin.checkOrderNumberExists(numeroOrden);
  }  



}

export { Controller };
