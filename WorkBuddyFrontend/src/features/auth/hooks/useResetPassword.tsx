import { useMutation } from "@tanstack/react-query";
import { resetPassword, type resetPasswordProps } from "../../settings/api/settings";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";

export function useResetPassword () {
    const { closeModal } = useModal();
    
    return useMutation({
        mutationFn: ({ currentPassword, newPassword }: resetPasswordProps) => resetPassword({ currentPassword, newPassword }),
        onError: (e) => {
            //@ts-ignore
            displayNotification(e.response.data.message, 'error');
        },
        onSuccess: (data) => {
            displayNotification(data.data.message, 'success');
            closeModal();
        }
    })
}