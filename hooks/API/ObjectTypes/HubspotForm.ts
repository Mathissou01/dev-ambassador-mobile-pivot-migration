import { Base, BaseType } from "./Base";
import { putAPI } from "../requestsManager";
import { Field } from "./Field";

export interface HubspotFormType extends BaseType {
  guid: string;
  formFieldGroups: Array<formFieldGroupsType>;
}

interface formFieldGroupsType {
  fields: Array<Field>;
}

export class HubspotForm extends Base {
  guid: string;
  formFieldGroups: Array<formFieldGroupsType>;

  constructor(params: HubspotFormType) {
    super({ table: "hubspotForms", ...params });
    const { guid, formFieldGroups } = params;
    this.guid = guid;
    this.formFieldGroups = formFieldGroups;
  }
}
