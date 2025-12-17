import { useQuery } from "@tanstack/react-query";
import { getNextWorkSession } from "../api/worksession";

export function useGetNextWorkSession () {  
    
    return useQuery({
        queryKey: ['next-work-session'],
        queryFn: getNextWorkSession,
    },
)}