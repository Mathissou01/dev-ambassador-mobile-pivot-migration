import {Base, BaseType} from "./Base";
import {hubspotField} from "@/types";

export interface HubspotFormType extends BaseType {
    guid: string;
    formFieldGroups: Array<formFieldGroupsType>;
}

interface formFieldGroupsType {
    fields: Array<hubspotField>;
}

export class HubspotForm extends Base {
    guid: string;
    formFieldGroups: Array<formFieldGroupsType>;

    constructor(params: HubspotFormType) {
        super({table: "hubspotForms", ...params});
        const {guid, formFieldGroups} = params;
        this.guid = guid;
        this.formFieldGroups = formFieldGroups;
    }
}
