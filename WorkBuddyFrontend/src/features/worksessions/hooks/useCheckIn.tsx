import { useMutation, useQueryClient } from "@tanstack/react-query";
import { displayNotification } from "../../../lib/sonner";
import { checkInWorkSession } from "../api/worksession";
import { useModal } from "../../../store/useModal";

export function useCheckIn () {
    const queryClient = useQueryClient();
    const { closeModal } = useModal();

    return useMutation({
        mutationFn: ({workSessionId}: { workSessionId: string }) => checkInWorkSession({ workSessionId }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("work-sessions"),
            });
            queryClient.invalidateQueries({ queryKey: ['next-work-session']})
            // queryClient.refetchQueries({
            //     predicate: (q) => q.queryKey.includes("next-work-session"),
            // });
            displayNotification(data.message, 'success');
            closeModal();
        },
        onError: (e) => {
            displayNotification(e.message, 'error');
            closeModal();
        }
    })
}