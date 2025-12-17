import { Navigate, useLocation } from "react-router-dom";
import { useValidateAuth } from "../hooks/useValidateAuth";
import { useAuth } from "../../../store/useAuth"
import paths from "../../../config/paths";
import { useEffect, type ReactNode } from "react";
import Loading from "../../../components/ui/Loading/Loading";

export default function ProtectedRoute ({children}: {children: ReactNode}) {

    const { data: authuser, isPending } = useValidateAuth();
    const { setUser } = useAuth();

    const location = useLocation();
    
    useEffect(() => {
        if (authuser) {
            setUser(authuser);
        }
    }, [authuser])

    if (isPending) return <Loading />

    if (!authuser) {
        return <Navigate to={'/auth'+paths.auth.login.getAbsoluteRoutedPath(location.pathname)}/>
    }

    return <>{children}</>
}