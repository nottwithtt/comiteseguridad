class Acuerdo {
  private acuerdoId?: string;
  private numeroOrden: number;
  private descripcion: string;
  private estado: "pendiente" | "completado";
  private eventoId?: string; // Add eventoId property

  constructor(
    numeroOrden: number,
    descripcion: string,
    estado: "pendiente" | "completado",
    eventoId?: string, // Add eventoId to constructor
    acuerdoId?: string
  ) {
    this.numeroOrden = numeroOrden;
    this.descripcion = descripcion;
    this.estado = estado;
    this.eventoId = eventoId; // Assign eventoId
    this.acuerdoId = acuerdoId;
  }

  // Getter methods
  public getNumeroOrden() {
    return this.numeroOrden;
  }

  public getDescripcion() {
    return this.descripcion;
  }

  public getEstado() {
    return this.estado;
  }

  public getEventoId() {
    return this.eventoId; // Add getter for eventoId
  }

  public getAcuerdoId() {
    return this.acuerdoId;
  }
}

export default Acuerdo;
