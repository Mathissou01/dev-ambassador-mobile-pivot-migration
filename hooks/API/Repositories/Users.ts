import {Base, BaseType} from "./Base";

export interface UsersType extends BaseType {
    table: String;
}

export class Users extends Base {
    constructor(params?: UsersType) {
        super(params);
    }
}