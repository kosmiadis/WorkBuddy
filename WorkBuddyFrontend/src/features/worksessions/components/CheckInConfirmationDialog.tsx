import type { UseMutateFunction } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { useModal } from "../../../store/useModal";

type CheckInConfirmationDialogProps = {
    checkIn: UseMutateFunction<any, Error, { workSessionId: string; }, unknown>;
    workSessionId: string;
}

export default function CheckInConfirmationDialog ({ checkIn, workSessionId }: CheckInConfirmationDialogProps) {
    const { closeModal } = useModal();
    
    return <article className="flex flex-col gap-2">
        <h2>Are you sure you want to check in?</h2>
        <div className="flex justify-end items-center gap-2">
            <Button onClick={closeModal} styleType="danger">Cancel</Button>
            <Button onClick={() => checkIn({ workSessionId })}>Yes</Button>
        </div>
    </article>
}