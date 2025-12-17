import type { ReactNode } from "react";
import { useTheme } from "../store/ThemeProvider";
import { Toaster } from 'sonner';

export default function ToastProvider ({ children }: { children: ReactNode }) {
    const { theme } = useTheme()
    
    return <>
        <Toaster theme={theme} richColors position="top-center" />
        {children}
    </>
}