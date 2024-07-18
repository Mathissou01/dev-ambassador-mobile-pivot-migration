import {BaseType} from "./Base";

interface RoleType extends BaseType {
    name: string;
    access: {
        app: boolean;
        admin_ambassador: boolean;
        admin_users: boolean;
        admin_full: boolean;
    };
}

export class Role {
    // PROPERTIES
    name: string | undefined;
    access: {
        app: boolean | undefined;
        admin_ambassador: boolean | undefined;
        admin_users: boolean | undefined;
        admin_full: boolean | undefined;
    } | {};

    constructor(params?: RoleType) {
        const {name, access} = params ?? {};
        this.name = name;
        this.access = access ?? {};
    }
}