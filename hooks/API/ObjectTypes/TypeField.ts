import {Base, BaseType} from "./Base";

interface TypeFieldsType extends BaseType {
    defaultValue: string | null,
    validator: string | undefined,
}

export class TypeField extends Base {
    // PROPERTIES
    defaultValue: string | null | undefined;
    validator: string | undefined;

    constructor(params?: TypeFieldsType) {
        super(params)
        const {defaultValue, validator} = params ?? {};
        this.defaultValue = defaultValue;
        this.validator = validator;
    }
}