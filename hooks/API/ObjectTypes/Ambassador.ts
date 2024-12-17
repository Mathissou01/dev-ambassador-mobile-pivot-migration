import {colors, generateColors} from "@/config/colorConfig";
import {School} from "./School";
import {User, UserType} from "./User";
import {UserStatistics} from "@/types";

export interface AmbassadorType extends UserType {
    stats: UserStatistics;
}

export class Ambassador extends User {
    stats: UserStatistics;

    constructor(props?: AmbassadorType) {
        super(props);
        const {stats} = props ?? {};
        this.stats = {
            nb_events: stats?.nb_events ?? 0,
            nb_forms: stats?.nb_forms ?? 0,
            next_events: stats?.next_events ?? 0,
            level: stats?.level ?? 0,
            credits: stats?.credits ?? 0,
        };
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
