import { AcuerdoDAO } from "../daos/AcuerdoDAO";
import Acuerdo from "../models/Acuerdo";
import { AcuerdoT } from "../schemas/acuerdoS"; // Import the AcuerdoT type

class AcuerdoAdmin {
  private acuerdoDAO: AcuerdoDAO = new AcuerdoDAO();

  constructor() {}

  // Helper method to convert Acuerdo class instance to plain object that matches AcuerdoT type
  private convertToAcuerdoT(acuerdo: Acuerdo): AcuerdoT {
    return {
      numeroOrden: acuerdo.getNumeroOrden(),
      descripcion: acuerdo.getDescripcion(),
      estado: acuerdo.getEstado(),
      eventoId: acuerdo.getEventoId(), // Add eventoId here
    };
  }

  public async getAcuerdo(id: string) {
    const acuerdo = await this.acuerdoDAO.getAcuerdoByID(id);
    return acuerdo;
  }

  public async createAcuerdo(
    numeroOrden: number,
    descripcion: string,
    estado: "pendiente" | "completado",
    eventoId: string // Add eventoId parameter
  ) {
    const acuerdo = new Acuerdo(numeroOrden, descripcion, estado, eventoId); // Pass eventoId to constructor
    const acuerdoData: AcuerdoT = this.convertToAcuerdoT(acuerdo);
    return await this.acuerdoDAO.createAcuerdo(acuerdoData);
  }

  public async updateAcuerdo(
    acuerdoId: string,
    numeroOrden: number,
    descripcion: string,
    estado: "pendiente" | "completado"
  ) {

    const acuerdoData: Partial<AcuerdoT> = {
      numeroOrden,
      descripcion,
      estado,

    };
  

    const updatedAcuerdo = await this.acuerdoDAO.updateAcuerdo(acuerdoId, acuerdoData);
    return updatedAcuerdo; 
  }

  public async deleteAcuerdo(acuerdoId: string) {
    return await this.acuerdoDAO.deleteAcuerdo(acuerdoId);
  }

  public async getAllAcuerdos() {
    return await this.acuerdoDAO.getAllAcuerdos();
  }

  public async getAcuerdosByEventoId(eventoId: string): Promise<AcuerdoT[]> {
    return await this.acuerdoDAO.getAcuerdosByEventoId(eventoId);
  }

  public async checkOrderNumberExists(numeroOrden: number) {
    return await this.acuerdoDAO.checkOrderNumberExists(numeroOrden);
  }
}

export { AcuerdoAdmin };
