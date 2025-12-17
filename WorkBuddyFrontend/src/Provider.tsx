import type { ReactNode } from "react";
import ThemeProvider from "./store/ThemeProvider";
import ToastProvider from "./lib/ToastProvider";
import Modal from "./components/ui/Modal";
import QueryProvider from "./store/QueryProvider";

export default function Provider ({ children }: { children: ReactNode}) {
    return <ThemeProvider>
        <QueryProvider>
            <ToastProvider>
                <Modal />
                {children}
            </ToastProvider>
        </QueryProvider>
    </ThemeProvider>
}