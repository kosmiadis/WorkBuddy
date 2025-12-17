import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { displayNotification } from "../../../lib/sonner";

type registerCredentials = { 
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export function useRegister () {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: registerCredentials) => register(credentials),
        onSuccess: (data) => {
            displayNotification(data.data.message, 'success');
            navigate('/dashboard');
        },
    })
}