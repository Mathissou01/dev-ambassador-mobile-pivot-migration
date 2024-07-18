import {Base, BaseType} from "./Base";

interface FieldType extends BaseType {
    name: string;
}

export class Field extends Base {
    // PROPERTIES
    name: string | undefined;

    constructor(props?: FieldType) {
        super(props);
        const {name} = props ?? {};
        this.name = name;
    }

}