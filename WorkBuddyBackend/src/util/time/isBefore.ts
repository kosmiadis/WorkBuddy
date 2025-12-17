export function isDateBefore (date1: Date, comparisonDate: Date) {
    if (new Date(date1).getTime() - new Date(comparisonDate).getTime() > 0) {
        return false;
    }
    return true;
}