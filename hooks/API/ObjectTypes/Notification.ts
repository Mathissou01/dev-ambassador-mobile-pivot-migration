import { Base, BaseType } from "./Base";
import { User, UserType } from "./User";
import { Event as Evenement, EventType } from "./Event";
import { NotificationData } from "../../../types";

interface NotificationType extends BaseType {
  users?: UserType;
  type?: string;
  subtype?: string | null;
  evenement?: EventType;
}

export class Notification extends Base {
  // PROPERTIES
  users: User;
  type: string;
  subtype: string | null;
  evenement: Evenement | null;

  constructor(props?: NotificationType) {
    super(props);
    const { users, type, subtype, evenement } = props ?? {};
    this.users = new User(users);
    this.type = type ?? "";
    this.subtype = subtype ?? null;
    this.evenement = evenement ? new Evenement(evenement) : null;
  }

  get notificationCard(): NotificationData {
    const year = this.evenement?.start_date?.getFullYear();
    const month = this.evenement?.start_date ? (this.evenement?.start_date.getMonth() + 1) : undefined;
    const day = this.evenement?.start_date?.getDate();
    const hourStart = this.evenement?.start_date?.getHours();
    const minutesStart = this.evenement?.start_date?.getMinutes();
    const hourEnd = this.evenement?.end_date?.getHours();
    const minutesEnd = this.evenement?.end_date?.getMinutes();

    const startDate = this.createdAt ?? new Date();
    const endDate = new Date();

    const secondsDiff = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    let textDiff: string = secondsDiff + (secondsDiff >= 2 ? " secondes" : " seconde");
    const minutesDiff = Math.floor(secondsDiff / 60);
    textDiff = minutesDiff >= 1 ? minutesDiff + (minutesDiff >= 2 ? " minutes" : " minute") : textDiff;
    const hoursDiff = Math.floor(minutesDiff / 60);
    textDiff = hoursDiff >= 1 ? hoursDiff + (hoursDiff >= 2 ? " heures" : " heure") : textDiff;
    const daysDiff = Math.floor(hoursDiff / 24);
    textDiff = daysDiff >= 1 ? daysDiff + (daysDiff >= 2 ? " jours" : " jour") : textDiff;
    const yearsDiff = Math.floor(daysDiff / 365);
    textDiff = yearsDiff >= 1 ? yearsDiff + (yearsDiff >= 2 ? " années" : " année") : textDiff;

    return {
      id: this._id,
      type: this.type,
      subtype: this.subtype,
      idEvent: this.evenement?._id,
      nameEvent: this.evenement?.name,
      dateEvent: [day, month, year].join("/"),
      startHourEvent: [hourStart, minutesStart].join("h"),
      endHourEvent: [hourEnd, minutesEnd].join("h"),
      levelAmbassador: "0",
      levelPodium: "0",
      stepForm: "0",
      timestamp: "Il y a " + textDiff
    };
  }

}
