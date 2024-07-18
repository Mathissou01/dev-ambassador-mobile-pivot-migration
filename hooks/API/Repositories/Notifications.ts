import { Base, BaseType } from "./Base";

export interface NotificationsType extends BaseType {
  table: string;
}

export class Notifications extends Base {
  constructor(params?: NotificationsType) {
    super({...params, table: "notifications"});
  }
}
