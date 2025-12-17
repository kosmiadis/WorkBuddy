import { useMutation } from "@tanstack/react-query";
import { addHourlyRate } from "../api/hourlyRate";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";

export function useHourlyRate () {
    const { closeModal } = useModal();
    
    return useMutation({ 
        mutationFn: ({ hourlyRate }: { hourlyRate: number }) =>  addHourlyRate({ hourlyRate }),
        onSuccess: (data) => {
            displayNotification('Hourly rate added', 'success');
            closeModal();
        },
        onError: (err) => {
            displayNotification(err.message, 'error');
            closeModal();
        }
    })
}