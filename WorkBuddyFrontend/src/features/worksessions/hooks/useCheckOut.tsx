import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutWorkSession } from "../api/worksession";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";

export function useCheckOut () {
    const queryClient = useQueryClient();
    const { closeModal } = useModal();

        return useMutation({
            mutationFn: ({workSessionId}: { workSessionId: string }) => checkOutWorkSession({ workSessionId }),
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    predicate: (q) => q.queryKey.includes("work-sessions"),
                });
                queryClient.invalidateQueries({ queryKey: ['next-work-session']})
                displayNotification(data.message, 'success')
                closeModal();
            },
            onError: (e) => {
                displayNotification(e.message, 'error');
                closeModal();
            }
    })
}