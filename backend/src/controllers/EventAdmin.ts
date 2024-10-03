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
  public async updateEvent(myevent: EventModel) {
    return await this.eventDAO.updateEvent(myevent);
  }
  public async deleteEvent(eventid: string) {
    return await this.eventDAO.deleteEvent(eventid);
  }
  public async checkOverlap(myevent: EventModel){
    return await this.eventDAO.checkOverlap(myevent);
  }
}

export { EventAdmin };
