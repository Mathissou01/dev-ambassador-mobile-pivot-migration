import { Answer } from "./Answer";
import { Field } from "./Field";
import { Form } from "./Form";
import { Role } from "./Role";
import { School } from "./School";
import { TypeField } from "./TypeField";
import { User } from "./User";
import { Ambassador } from "./Ambassador";
import { Event } from "./Event";

export const Store = {
  ambassador: Ambassador,
  answers: Answer,
  fields: Field,
  forms: Form,
  roles: Role,
  schools: School,
  typeFields: TypeField,
  users: User,
  events: Event,
};

export class DynamicClass {
  constructor(className: string, opts: any) {
    if (Store[className] === undefined || Store[className] === null) {
      throw new Error(`Class type of \'${className}\' is not in the store`);
    }
    return new Store[className](opts);
  }
}
