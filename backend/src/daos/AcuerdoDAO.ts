import Acuerdo from "../schemas/acuerdoS"; // Import the Acuerdo schema/model
import { AcuerdoT } from "../schemas/acuerdoS"; // Import the Acuerdo type for typing

class AcuerdoDAO {
  constructor() { }

  public async getAcuerdoByID(id: string): Promise<AcuerdoT | null> {
    return await Acuerdo.findOne({ _id: id });
  }

  public async createAcuerdo(acuerdoData: AcuerdoT): Promise<AcuerdoT> {
    return await Acuerdo.create(acuerdoData);
  }

  public async updateAcuerdo(id: string, acuerdoData: AcuerdoT): Promise<AcuerdoT | null> {
    return await Acuerdo.findByIdAndUpdate(id, acuerdoData, { new: true });
  }

  public async deleteAcuerdo(id: string): Promise<void> {
    await Acuerdo.deleteOne({ _id: id });
  }

  public async getAllAcuerdos(): Promise<AcuerdoT[]> {
    return await Acuerdo.find();
  }
  
  public async getAcuerdosByEventoId(eventoId: string): Promise<AcuerdoT[]> {
    return await Acuerdo.find({ eventoId }); //
  }

  public async checkOrderNumberExists(orderNumber: number): Promise<boolean> {
    const count = await Acuerdo.countDocuments({ numeroOrden: orderNumber });
    return count > 0;
  }
}

export { AcuerdoDAO };
