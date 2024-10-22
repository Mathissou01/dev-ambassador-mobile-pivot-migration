import {Base, type BaseType} from "./Base";
import {School, SchoolType} from "@/hooks/API/ObjectTypes/School";
import {convertHTMLEntity} from "@/utils/convertHtmlEntity";

export interface DocumentationType extends BaseType {
    title: string;
    text: string;
    schools: SchoolType[] | string[];
    isVisible: boolean;
}

export class Documentation extends Base {
    // PROPERTIES
    title: string = "";
    text: string = "";
    schools: SchoolType[] | string[] = [];
    isVisible: boolean = false;

    constructor(params: DocumentationType) {
        super(params);
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const {title, text, schools, isVisible} = params ?? {};
        this.title = title ?? this.title;
        this.text = text ?? this.text;
        this.schools = (schools?.map((sch) => typeof sch === "string" ? sch : new School(sch)) ?? []) as (School[] | string[]);
        this.isVisible = isVisible ?? this.isVisible;
    }

    get viewable() {
        return {
            title: this.title,
            content: convertHTMLEntity(this.text)
        }
    }
}
