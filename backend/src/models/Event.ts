import { Types } from "mongoose"; // Import mongoose to handle ObjectId for acuerdos

export interface Acuerdo {
    _id: Types.ObjectId; // Mongoose ObjectId
    numeroOrden: number;
    descripcion: string;
    estado: "pendiente" | "completado";
}


export default class Event {
  private eventId: string | null;
  private name: string;
  private description: string;
  private date: Date;
  private durationinhours: number;
  private acuerdos: Types.ObjectId[]; // New field to store array of ObjectIds referencing Acuerdos

  constructor(
    name: string,
    description: string,
    date: Date,
    durationinhours: number = 0, // Set default value to avoid undefined if not provided
    acuerdos: Types.ObjectId[] = [], // Add acuerdos as an optional parameter
    eventId?: string
  ) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.durationinhours = durationinhours;
    this.acuerdos = acuerdos; // Initialize acuerdos
    this.eventId = eventId || null; // Set eventId if provided, otherwise default to null
  }

  // Getters
  public getEventId(): string | null {
    return this.eventId;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): Date {
    return this.date;
  }

  public getDurationInHours(): number {
    return this.durationinhours;
  }

  public getAcuerdos(): Types.ObjectId[] {
    return this.acuerdos; // Return acuerdos
  }

  // Setters
  public setEventId(eventId: string | null): void {
    this.eventId = eventId;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public setDurationInHours(durationinhours: number): void {
    this.durationinhours = durationinhours;
  }

  public setAcuerdos(acuerdos: Types.ObjectId[]): void {
    this.acuerdos = acuerdos; // Set acuerdos
  }
}

export { Event };
