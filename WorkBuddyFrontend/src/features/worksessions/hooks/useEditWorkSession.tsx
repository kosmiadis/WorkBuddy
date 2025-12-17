import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWorkSession } from "../api/worksession";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";

export function useEditWorkSession () {
    const { closeModal } = useModal();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ workSessionId, scheduledCheckInDate, scheduledCheckOutDate, checkInDate, checkOutDate }: {
            workSessionId: string;
            scheduledCheckInDate: Date;
            scheduledCheckOutDate: Date;
            checkInDate?: Date;
            checkOutDate?: Date;
        }) => editWorkSession({
            workSessionId,
            scheduledCheckInDate,
            scheduledCheckOutDate,
            checkInDate,
            checkOutDate,
        }),
        onSuccess: (data) => {
            closeModal();
            displayNotification(data.data.message, 'success');
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("work-sessions"),
            });
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("monthly-general-report"),
            });
        },
        onError: () => {
            closeModal();
            displayNotification('Work session was not updated', 'error');
        }
    })
}