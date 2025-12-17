import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function getTimeTill(date: Date | string) {
    return dayjs(new Date()).to(date);
}

export function getTimeFrom(date: Date | string) {
    return dayjs(date).from(new Date())
}

export function getTime(date: Date | string) {
    return dayjs(date).format('HH:mm');
}

export function getTimeWithSeconds (date: Date | string) {
    return dayjs(date).format('hh:mm:ss');
}

export function getFullDate(date: Date | string) {
    return dayjs(date).format('DD/MM/YYYY');
}
