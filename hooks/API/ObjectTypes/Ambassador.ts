import { generateColors, colors } from "@/config/colorConfig";
import { School } from "./School";
import { User, UserType } from "./User";

export interface AmbassadorType extends UserType {
  stats: { nb_forms: String; nb_events: Number };
}

export class Ambassador extends User {
  stats: { nb_forms: String; nb_events: Number } | undefined;

  constructor(props?: AmbassadorType) {
    super(props);
    const { stats } = props ?? {};
    this.stats = stats;
  }

  get json() {
    const jsonRet = {};
    Object.keys(this).forEach((key) => {
      if (!["notUpdatable"].includes(key)) {
        if (this[key] instanceof Date) jsonRet[key] = JSON.stringify(this[key]);
        else jsonRet[key] = this[key];
      }
    });
    return jsonRet;
  }

  get generatePalette() {
    if (this.school instanceof School) {
      const colorsIn =
        colors ??
        generateColors(
          this.school.colors.primary,
          this.school.colors.secondary
        );
      return colorsIn;
    }
    return {};
  }
}
