import { SchoolType } from "../ObjectTypes/School";
import { Base, BaseType } from "./Base";

export interface SchoolsType extends BaseType {
	table: String;
}

export class Schools extends Base {
	constructor(params?: SchoolsType) {
		super(params);
	}

	getSchoolById(id: string): SchoolType | null {
		const tmpSchool: Array<SchoolType> = this.allMinData.filter(
			(data: SchoolType) => data._id === id
		);
		if (tmpSchool[0] !== undefined) return tmpSchool[0];
		return null;
	}
}
