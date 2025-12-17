import { useQuery } from "@tanstack/react-query";
import { me } from "../api/auth";

export function useValidateAuth () {
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: me,
    })
}