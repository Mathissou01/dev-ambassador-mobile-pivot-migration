import { User } from "./User";
import { Base, BaseType } from "./Base";
import { hubspotData } from "../../../types";

interface AnswerType extends BaseType {
  ambassador: User | string | null;
  form: string | null;
  answers?: any;
}

export class Answer extends Base {
  // PROPERTIES
  ambassador: User | string | null = null;
  form: string | null;
  answers: hubspotData = {
    submittedAt: new Date().getTime(),
    fields: [],
    legalConsentOptions: {
      "consent": { // Include this object when GDPR options are enabled
        "consentToProcess": true,
        "text": "I agree to allow Example Company to store and process my personal data.",
        "communications": [
          {
            "value": true,
            "subscriptionTypeId": 999,
            "text": "I agree to receive marketing communications from Example Company."
          }
        ]
      }
    }
  };

  constructor(params?: AnswerType) {
    super({ ...params, table: "answers" });
    const { ambassador, form, answers } = params ?? {};
    this.ambassador = ambassador ?? this.ambassador;
    this.form = form ?? null;
    if (answers)
      this.generateHubspotAnswer(answers);
  }

  generateHubspotAnswer(formAnswer: any, formFields?: any) {
    const provAnswers = this.answers;
    Object.entries(formAnswer).forEach(([inputName, inputValue]: [inputName: string, inputValue: any]) => {
      provAnswers.fields.push({
        objectTypeId: formFields?.filter((inInField: {
          name: string
        }) => inInField.name === inputName)?.[0]?.objectTypeId ?? "0-1",
        name: inputName,
        value: inputValue
      });
    });

    this.answers = provAnswers;
  }
}
