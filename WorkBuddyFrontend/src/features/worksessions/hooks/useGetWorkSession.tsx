import { useQuery } from "@tanstack/react-query";
import { getWorkSession } from "../api/worksession";

export function useGetWorkSession ({ workSessionId }: { workSessionId: string }) {
    
    return useQuery({
        queryKey: [ workSessionId, 'work-session' ],
        queryFn: () => getWorkSession({ workSessionId })
    })
}