import {Base, BaseType} from "./Base";

export interface EventType extends BaseType {
    name: string;
    address: string;
    description: string;
    rdv_date: Date;
    rdv_address: Date;
    start_date: Date;
    end_date: Date;
    credits: Number;
    represented_school: Array<string> | undefined;
    delegate_per_school: Object | undefined;
}

interface delegatePerSchoolType {
    ambassadors: {
        ambassador_id: string;
        status: number;
        status_created: Date;
        status_updated: Date;
    };
    max: number;
}

export class Event extends Base {
    // PROPERTIES
    name: string | undefined;
    description: string | undefined;
    address: string | undefined;
    start_date: Date | undefined;
    end_date: Date | undefined;
    rdv_date: Date | undefined;
    rdv_address: Date | undefined;
    credits: number;
    represented_school: Array<string> | undefined;
    delegate_per_school: Object | undefined;

    constructor(props?: EventType) {
        super(props);
        const {
            name,
            start_date,
            end_date,
            description,
            address,
            rdv_address,
            rdv_date,
            credits,
            represented_school,
            delegate_per_school,
        } = props ?? {};
        this.name = name;
        this.start_date = start_date ? new Date(start_date) : start_date;
        this.end_date = end_date ? new Date(end_date) : end_date;
        this.description = description;
        this.address = address;
        this.rdv_date = rdv_date ? new Date(rdv_date) : rdv_date;
        this.rdv_address = rdv_address;
        this.credits = credits ?? 0;
        this.represented_school = represented_school ?? undefined;
        this.delegate_per_school = delegate_per_school ?? undefined;
    }

    get eventColor(): string {
        if ("text".includes("salon")) {
            return "#ff0";
        }
        return "#fff";
    }

    public get date_start_date_only() {
        return this.start_date?.toISOString().split("T")[0];
    }

    public get get_end_date_only() {
        return this.end_date?.toISOString().split("T")[0];
    }

    public get formatCalendar() {
        const returnNonEmpty = (value: any) => {
            if (value !== "") return value;
            return undefined;
        };
        const ambassadorsInEvent = this.delegate_per_school
            ? Object.values(this.delegate_per_school)
                .filter((sch: any) => sch.ambassadors)
                .map((sch: any) =>
                    sch.ambassadors.map((amb: any) => {
                        return [amb.ambassador_id, amb.status];
                    })
                )
                .flat()
            : [];
        const takenSeat = ambassadorsInEvent
            .map((part) => part[1])
            .filter((val) => parseInt(val) === 1);
        // create a variable for the sum and initialize it

        const allMax = this.delegate_per_school
            ? Object.values(this.delegate_per_school).map((sch) => sch.max)
            : [];
        // create a variable for the sum and initialize it
        let sum = 0;
        allMax.forEach((max) => {
            sum += parseInt(max);
        });

        return {
            event_id: this._id,
            rdv_hour: returnNonEmpty(this.rdv_date) ?? new Date(),
            debut_hour: this.start_date,
            end_hour: this.end_date,
            title: this.name,
            description: this.description,
            localisation: this.address,
            rdv_localisation: this.rdv_address,
            actual_seat: takenSeat.length,
            max_seat: sum,
            credits: this.credits,
            participationStatus: ambassadorsInEvent,
            represented_school: this.represented_school,
        };
    }
}
