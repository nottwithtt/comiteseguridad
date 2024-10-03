export default class Event {
    private eventId: string | null;
    private name: string;
    private description: string;
    private date: Date;
    private durationinhours: number;
    
    constructor(
      name: string,
      description: string,
      date: Date,
      durationinhours?: number,
      eventId?: string
    ) {
      this.name = name;
      this.description = description;
      this.date = date;
      this.durationinhours = durationinhours;
      this.eventId = eventId;
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
  }
  
  export { Event };
  