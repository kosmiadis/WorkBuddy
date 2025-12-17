import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { displayNotification } from "../../../lib/sonner";
import { useNavigate } from "react-router-dom";

export function useLogout () {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear();
            navigate('/');
            displayNotification('Logout successful', 'success');
        },
        onError: (e) => {
            displayNotification(e.message, 'error');
        }
    })
}