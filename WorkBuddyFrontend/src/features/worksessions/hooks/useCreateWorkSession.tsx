import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkSession } from "../api/worksession";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";

export function useCreateWorkSession () {
    const { closeModal } = useModal();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ scheduledCheckInDate, scheduledCheckOutDate}: {
            scheduledCheckInDate: Date, scheduledCheckOutDate: Date
        }) => createWorkSession({ scheduledCheckInDate, scheduledCheckOutDate}),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("work-sessions"),
            });
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("monthly-general-report"),
            });
            closeModal()
            displayNotification(data.data.message, 'success');
            
        },
        onError: (e) => {
            closeModal();
            //@ts-ignore
            displayNotification(e.response.data.message, 'error');
        }
    })
}