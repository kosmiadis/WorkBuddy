import { useQuery } from "@tanstack/react-query";
import { getOverallReport } from "../api/analytics";

export function useOverallReport () {
    return useQuery({
        queryKey: ['analytics', 'overall-report'],
        queryFn: getOverallReport,
    })
}