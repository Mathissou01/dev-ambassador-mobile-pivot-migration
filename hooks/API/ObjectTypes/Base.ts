import { Pluralizer } from "./Pluralizer";
import { deleteAPI, postAPI, putAPI } from "../requestsManager";

export type BaseType = {
  _id: string;
  table?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Base {
  // PROPERTIES
  _id: string;
  table: string;
  updatedAt: Date;
  createdAt: Date;
  private notUpdatable: string[] = [
    "notUpdatable",
    "table",
    "_id",
    "updatedAt",
    "createdAt"
  ];

  constructor(params: BaseType) {
    const { _id, table, updatedAt, createdAt } = params ?? {};
    const tableName =
      this.constructor.name.charAt(0).toLowerCase() +
      this.constructor.name.slice(1);
    this._id = _id ?? "";
    this.table = table ?? Pluralizer(tableName);
    this.updatedAt = (updatedAt != null) ? new Date(updatedAt) : new Date();
    this.createdAt = (createdAt != null) ? new Date(createdAt) : new Date();
  }

  addNonUpdatableField(field: string) {
    this.notUpdatable.push(field);
  }

  save(callback?: Function) {
    console.log("OK");
    if (this._id !== null && this._id !== "")
      return putAPI({
        objectType: this.table,
        idToModify: this._id,
        dataToTransfert: {}
      }).then((response: any) => {
        (callback ? callback(response) : () => {
        });
        return response;
      });
    else
      return postAPI({
        objectType: this.table,
        dataToTransfert: this.toString(["_id"])
      }).then((response: any) => {
        (callback ? callback(response) : () => {
        });
        return response;
      });
  }

  delete(callback?: Function): Promise<any> | { error: boolean, message: string } {
    if (this._id !== null)
      return deleteAPI({
        objectType: this.table,
        idToDelete: this._id
      }).then((response: any) => {
        if (callback) callback(response);
        else return response;
      });
    else return { error: true, message: "Not in database to be deleted." };
  }

  toString(fieldsToIgnore: Array<string> = []) {
    const objectJson = JSON.parse(JSON.stringify(this));
    fieldsToIgnore.forEach((field) => delete objectJson[field]);
    this.notUpdatable.forEach((field) => delete objectJson[field]);
    for (const [key, value] of Object.entries(objectJson)) {
      if (!value || value === "" || value === null) delete objectJson[key];
      else if (typeof value === "object") {
        if (Object.keys(value).length === 0) delete objectJson[key];
      }
    }
    return objectJson;
  }
}
