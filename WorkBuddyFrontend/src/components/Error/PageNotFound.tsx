import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { displayNotification } from "../../lib/sonner";

export default function PageNotFound () {
    useEffect(() => {
        displayNotification('The page you are looking for does not exist!', 'warning');
    }, [])
    
    return <Navigate to='/' />
}