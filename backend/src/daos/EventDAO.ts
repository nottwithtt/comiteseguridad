import Event from "../schemas/eventS";
import EventModel from "../models/Event";
import dayjs from "dayjs";

class EventDAO {
  constructor() { }
  // Retorna un usuario por id
  public async getEventByID(id: string) {
    return await Event.findOne({ _id: id });
  }
  public async createEvent(myevent: EventModel) {
    return await Event.create({
      ...myevent,
      dateend: dayjs(myevent.getDate()).add(myevent.getDurationInHours(), "hours")
    });
  }
  public async updateEvent(myevent: EventModel) {
    return await Event.findByIdAndUpdate(
      myevent.getEventId(),
      {
        ...myevent,
        dateend: dayjs(myevent.getDate()).add(myevent.getDurationInHours(), "hours")
      },
      { new: true }
    )
  }
  public async deleteEvent(eventid: string) {
    return await Event.deleteOne({ _id: eventid});
  }
  public async checkOverlap(myevent: EventModel) {
    const mydatestart = myevent.getDate();
    const mydateend = dayjs(myevent.getDate()).add(myevent.getDurationInHours(), "hours")

    return (await Event.find(
      { date: {$lt: mydateend},
        dateend: {$gt: mydatestart},
        _id: {
          $ne: myevent.getEventId()
        }
      })).length > 0;
  }
}

export { EventDAO };
