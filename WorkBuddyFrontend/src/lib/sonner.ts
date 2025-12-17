import { toast } from "sonner";

export function displayNotification (msg: string, type: 'success' | 'warning' | 'info' | 'error' | 'loading') {
    toast[type](msg);
}   