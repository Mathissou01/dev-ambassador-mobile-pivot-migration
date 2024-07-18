import { Base, BaseType } from "./Base";
import { Form } from "../ObjectTypes/Form";

export interface FormsType extends BaseType {
    table: string;
}

export class Forms extends Base {
    constructor(params?: FormsType) {
        super(params);
    }

    public async getFormForCalendar(getAll: boolean = false) {
        const forms = getAll
            ? await this.getAll()
            : await this.getWithParams("between", [new Date().toISOString()]);
        const uniqueDate = new Set(
            forms.map((form: Evenement) => {
                return form.date_start_date_only;
            })
        );
        const formFormated = [...uniqueDate].map((date: any) => {
            return {
                title: date,
                data: forms
                    .filter((formIn: Evenement) => {
                        return formIn.date_start_date_only == date;
                    })
                    .map((formIn: Evenement) => formIn.formatCalendar),
            };
        });

        return formFormated;
    }
}
