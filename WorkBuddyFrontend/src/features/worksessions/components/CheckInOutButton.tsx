import Button from "../../../components/ui/Button";
import { useGetNextWorkSession } from "../hooks/useGetNextWorkSession";
import { useCheckIn } from "../hooks/useCheckIn";
import { useCheckOut } from "../hooks/useCheckOut";
import type { WorkSessionI } from "../../../types/WorkSession";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";
import CheckInConfirmationDialog from "./CheckInConfirmationDialog";
import CheckOutConfirmationDialog from "./CheckOutConfirmationDialog";

type CheckInOutButtonProps = {
    nextWorkSession: WorkSessionI | null;
}

export default function CheckInOutButton ({ nextWorkSession }: CheckInOutButtonProps) {
    const { mutate: checkIn, isPending: isCheckingIn } = useCheckIn() 
    const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut() 
    const { openModal } = useModal();

    function handleClick () {
        const { scheduledCheckInDate, hasCheckedIn } = nextWorkSession as WorkSessionI;    
        const checkInTimeDiffInMill = new Date(scheduledCheckInDate).getTime() - new Date().getTime();
        const differenceInMinutesTillWorkSession = Math.round(checkInTimeDiffInMill / (1000 * 60))

        if (!hasCheckedIn && differenceInMinutesTillWorkSession > 10) return displayNotification('You can check in at most 10 minutes before shift begins', 'info')        
        if (!hasCheckedIn && differenceInMinutesTillWorkSession <= 10) return openModal(<CheckInConfirmationDialog checkIn={checkIn} workSessionId={nextWorkSession!._id}/>, 'form');
        if (hasCheckedIn) return openModal(<CheckOutConfirmationDialog checkOut={checkOut} workSessionId={nextWorkSession!._id}/>, 'form');
    }

    if (nextWorkSession && (!nextWorkSession.hasCheckedIn || !nextWorkSession.hasCheckedOut)) return <Button 
            onClick={handleClick} 
            disabled={ isCheckingIn || isCheckingOut }>
                {!nextWorkSession.hasCheckedIn && 'Check In'}
                {nextWorkSession.hasCheckedIn && !nextWorkSession.hasCheckedOut && 'Check Out'}
        </Button>
        
}