import { Base, BaseType } from "./Base";

export interface FilesType extends BaseType {
  table: string;
}

export class Files extends Base {
  constructor(params?: FilesType) {
    super(params);
  }
}
