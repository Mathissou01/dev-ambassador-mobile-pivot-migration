import {Base, type BaseType} from "./Base";

export interface ArchivesType extends BaseType {
    table: string;
}

export class Archives extends Base {
    constructor(params?: ArchivesType) {
        super({table: "archives", ...params});
    }
}
