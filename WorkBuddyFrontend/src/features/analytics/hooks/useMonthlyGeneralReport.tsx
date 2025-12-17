import { useQuery } from "@tanstack/react-query";
import { getMonthlyGeneralReport } from "../api/analytics";

export function useMonthlyGeneralReport() {
    return useQuery({
        queryKey: ['monthly-general-report'],
        queryFn: getMonthlyGeneralReport,
    })
}