/*
    Gets a UTC formatted date and converts it to locale date
*/

export function toLocalDate (date: string | Date) {
    return new Date(date).setHours(new Date(date).getHours() - new Date(date).getTimezoneOffset() / 60)
}


// console.log(toLocalDate('2025-12-20T13:33:00.000Z'))