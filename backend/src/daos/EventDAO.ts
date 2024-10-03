import Event from "../schemas/eventS";
import EventModel from "../models/Event";
import dayjs from "dayjs";

class EventDAO {
  constructor() {}


  public async getEventByID(id: string) {
    return await Event.findOne({ _id: id }).populate("acuerdos"); // acuerdos
  }


  public async getAllEvents() {
    return await Event.find(); 
  }


  public async createEvent(myevent: EventModel) {
    return await Event.create({
      name: myevent.getName(),
      description: myevent.getDescription(),
      date: myevent.getDate(),
      durationinhours: myevent.getDurationInHours(),
      acuerdos: myevent.getAcuerdos(), 
      dateend: dayjs(myevent.getDate()).add(myevent.getDurationInHours(), "hours").toDate(),
    });
  }


  public async updateEvent(myevent: EventModel) {
    return await Event.findByIdAndUpdate(
      myevent.getEventId(),
      {
        name: myevent.getName(),
        description: myevent.getDescription(),
        date: myevent.getDate(),
        durationinhours: myevent.getDurationInHours(),
        acuerdos: myevent.getAcuerdos(), 
        dateend: dayjs(myevent.getDate()).add(myevent.getDurationInHours(), "hours").toDate(),
      },
      { new: true }
    ).populate("acuerdos"); 
  }

  public async deleteEvent(eventid: string) {
    return await Event.deleteOne({ _id: eventid });
  }


  public async checkOverlap(myevent: EventModel) {
    const mydatestart = myevent.getDate();
    const mydateend = dayjs(myevent.getDate()).add(myevent.getDurationInHours(), "hours");

    return (
      await Event.find({
        date: { $lt: mydateend.toDate() },
        dateend: { $gt: mydatestart },
        _id: { $ne: myevent.getEventId() }, // Exclude the current event if updating
      })
    ).length > 0;
  }
}

export { EventDAO };
