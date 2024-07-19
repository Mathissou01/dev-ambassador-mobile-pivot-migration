import {getAPI} from "../requestsManager";
import {DynamicClass} from "../ObjectTypes/DynamicClass";

export type BaseType = {
    table: string;
};

export class Base {
    // PROPERTIES
    table: string;
    allMinData: Array<any>;

    constructor(params?: BaseType) {
        const {table} = params ?? {};
        this.table = table ?? this.constructor.name.charAt(0).toLowerCase() + this.constructor.name.slice(1);
        this.allMinData = [];
    }

    getAll<ReturnType>(): Promise<ReturnType> {
        const linkedObject = this;
        return getAPI({objectType: this.table}).then(function (response: any) {
            linkedObject.allMinData = response;
            return response.map((resp: any) => new DynamicClass(linkedObject.table, resp));
        });
    }

    get all() {
        return this.allMinData;
    }

    async getById<WantedType>(id: string): Promise<WantedType> {
        const linkedObject = this;
        const response = await getAPI({objectType: this.table, options: "/" + id});
        linkedObject.allMinData = response;
        if (typeof response == "object") {
            return new DynamicClass(linkedObject.table, response) as WantedType;
        } else {
            return response.map((resp: any) => new DynamicClass(linkedObject.table, resp));
        }
    }

    getWithParams(params: string, values: Array<string> = []) {
        const linkedObject = this;
        return getAPI({
            objectType: this.table,
            options: "/" + params + (values.length > 0 ? "/" + values.join("/") : ""),
        }).then(function (response: any) {
            linkedObject.allMinData = response;
            return response.map((resp: any) => new DynamicClass(linkedObject.table, resp));
        });
    }
}
