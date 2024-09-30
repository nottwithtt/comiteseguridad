import { EventDAO } from "../daos/EventDAO";
import EventModel from "../models/Event";

class EventAdmin {
  private eventDAO: EventDAO = new EventDAO();

  constructor() {}

  public async getEvent(id: string) {
    const event = await this.eventDAO.getEventByID(id);
    return event;
  }
  public async createEvent(myevent: EventModel){
    return await this.eventDAO.createEvent(myevent);
  }
}

export { EventAdmin };
