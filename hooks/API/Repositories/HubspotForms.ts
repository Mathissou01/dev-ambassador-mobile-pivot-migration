import { Base, BaseType } from "./Base";
import { Form } from "../ObjectTypes/Form";

export interface FormsType extends BaseType {
    table: string;
}

export class HubspotForms extends Base {
    constructor(params?: FormsType) {
        super(params);
        this.table = "hubspotForms";
    }
}
