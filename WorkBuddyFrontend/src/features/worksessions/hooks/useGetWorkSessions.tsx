import { useQuery } from "@tanstack/react-query";
import { getWorkSessions } from "../api/worksession";
import { useLocation } from "react-router-dom";

export function useGetWorkSessions ({ limit }: {limit?: number}) {
    const location = useLocation();
    
    return useQuery({
        queryKey: [location.pathname, 'work-sessions'],
        //@ts-ignore
        queryFn: () => getWorkSessions({ limit })
    })
}