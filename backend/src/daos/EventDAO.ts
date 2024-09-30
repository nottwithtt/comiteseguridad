import Event from "../schemas/eventS";
import EventModel from "../models/Event";

class EventDAO {
  constructor() {}
  // Retorna un usuario por id
  public async getEventByID(id: string) {
    return await Event.findOne({ _id: id });
  }
  public async createEvent(myevent: EventModel){
    return await Event.create(myevent);
  }
}

export { EventDAO };
