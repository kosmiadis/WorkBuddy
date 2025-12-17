import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export default function QueryProvider ({ children }: { children: ReactNode}) {

    const [ queryClient ] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
                refetchOnWindowFocus: false,
            },
            mutations: {
                retry: 0,
                // onError: (e) => {
                //     displayNotification(e.message, 'error');
                // },
            }
        }
    }))
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}