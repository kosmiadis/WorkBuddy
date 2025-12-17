import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../api/auth";
import { displayNotification } from "../../../lib/sonner";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount () {

    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteAccount,
        onSuccess: (data) => {
            displayNotification('Account deleted', 'success');
            navigate('/auth/login');
        },
        onError: (e) => {
            displayNotification('Account was not deleted', 'error')
        }
    })
}