import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { displayNotification } from "../../../lib/sonner";


type loginCredentials = { email: string, password: string }

export function useLogin () {
    const { search } = useLocation();
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: (credentials: loginCredentials) => login(credentials),
        onSuccess: (data) => {
            if (search) {
                displayNotification(data.data.message, 'success');
                navigate(decodeURIComponent(search.split('=')[1]));
                return;
            }  
            navigate('/dashboard');
        },
    })
}