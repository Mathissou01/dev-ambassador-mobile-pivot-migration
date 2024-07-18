import { Base, BaseType } from "./Base";

export interface SchoolType extends BaseType {
  name?: string;
  colors?: { primary: string; secondary: string };
}

export class School extends Base {
  // PROPERTIES
  name: string | undefined;
  colors: { primary: string; secondary: string } | undefined;

  constructor(params: SchoolType) {
    super(params);
    const { name, colors } = params ?? {};
    this.name = name;
    this.colors = colors;
  }
}
