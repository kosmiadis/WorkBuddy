import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModal } from "../../../store/useModal";
import { displayNotification } from "../../../lib/sonner";
import { deleteWorkSession } from "../api/worksession";

export function useDeleteWorkSession () {
    const { closeModal } = useModal();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ workSessionId }: {workSessionId: string}) => deleteWorkSession({ workSessionId }),
        onSuccess: async (data) => {
            closeModal()
            //@ts-ignore
            displayNotification(data.data.message, 'success');
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("work-sessions"),
            });
            queryClient.invalidateQueries({
                predicate: (q) => q.queryKey.includes("monthly-general-report"),
            });
        },
        onError: () => {
            displayNotification('Work session was not deleted', 'error');
        }
    })
}
