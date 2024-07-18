import { School } from "./School";
import { Event as Evenement } from "./Event";
import { Field } from "./Field";
import { Base, BaseType } from "./Base";
import {HubspotForm} from "./HubspotForm";

interface FormType extends BaseType {
	school: School | undefined;
	evenement: Evenement | undefined
	name: string | undefined;
	hubspot_form: HubspotForm | undefined;
	isVisible: false;
}

export class Form extends Base {
	// PROPERTIES
	school: School | undefined;
	evenement: Evenement | undefined
	name: string | undefined;
	hubspot_form: HubspotForm | undefined;
	isVisible: false;

	constructor(props?: FormType) {
		super(props);
		const { school, evenement, name,hubspot_form,isVisible } = props ?? {};
		this.school = school;
		this.evenement = evenement;
		this.name = name;
		this.hubspot_form = hubspot_form;
		this.isVisible = isVisible ?? false;
	}
}
