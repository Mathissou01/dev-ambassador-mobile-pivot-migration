import { Base, BaseType } from "./Base";
import { Event as Evenement } from "../ObjectTypes/Event";

export interface EventsType extends BaseType {
  table: string;
}

export class Events extends Base {
  constructor(params?: EventsType) {
    super(params);
  }

  public async getEventForCalendar(getAll: boolean = false) {
    const events = getAll
      ? await this.getAll()
      : await this.getWithParams("between", [new Date().toISOString()]);
    const uniqueDate = new Set(
      events.map((event: Evenement) => {
        return event.date_start_date_only;
      })
    );
    const eventFormated = [...uniqueDate].map((date: any) => {
      return {
        title: date,
        data: events
          .filter((eventIn: Evenement) => {
            return eventIn.date_start_date_only == date;
          })
          .map((eventIn: Evenement) => eventIn.formatCalendar),
      };
    });

    return eventFormated;
  }
}
