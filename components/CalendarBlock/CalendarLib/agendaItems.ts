import isEmpty from "lodash/isEmpty";
import {type MarkedDates} from "./types";
import {Events} from "../../../hooks/API/Repositories/Events";

export function getMarkedDates(agendaItems: any[]) {
    const marked: MarkedDates = {};

    agendaItems.forEach((item) => {
        // NOTE: only mark dates with data
        if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
            marked[item.title] = {marked: true};
        } else {
            marked[item.title] = {disabled: true};
        }
    });
    return marked;
}

const EventsRepos = new Events();

export async function getAndExportTest(): Promise<any> {
    try {
        return await EventsRepos.getEventForCalendar();
    } catch (err) {
        console.error(err);
        throw err;
    }

}

