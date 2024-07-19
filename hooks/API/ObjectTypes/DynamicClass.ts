import {Answer} from "./Answer";
import {Field} from "./Field";
import {File} from "./File";
import {Form} from "./Form";
import {Role} from "./Role";
import {School} from "./School";
import {TypeField} from "./TypeField";
import {User} from "./User";
import {Ambassador} from "./Ambassador";
import {Event} from "./Event";
import {Notification} from "./Notification";
import {Archive} from "./Archive";
import {ArchivePost} from "./ArchivePost";
import {HubspotForm} from "@/hooks/API/ObjectTypes/HubspotForm";

export const Store: any = {
    ambassador: Ambassador,
    answers: Answer,
    archives: Archive,
    archivePosts: ArchivePost,
    fields: Field,
    files: File,
    forms: Form,
    hubspotForms: HubspotForm,
    roles: Role,
    schools: School,
    typeFields: TypeField,
    notifications: Notification,
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
