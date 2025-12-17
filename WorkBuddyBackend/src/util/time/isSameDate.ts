export function isSameDate (d1: Date, d2: Date) {
    
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();

}