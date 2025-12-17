import type { UseMutateFunction } from "@tanstack/react-query";
import Button from "../../../components/ui/Button";
import { useModal } from "../../../store/useModal";

type CheckInConfirmationDialogProps = {
    checkOut: UseMutateFunction<any, Error, { workSessionId: string; }, unknown>;
    workSessionId: string;
}

export default function CheckOutConfirmationDialog ({ checkOut, workSessionId }: CheckInConfirmationDialogProps) {

    const { closeModal } = useModal();
    return <article className="flex flex-col gap-2">
        <h3>Are you sure you want to check out?</h3>
        <div className="flex justify-end items-center gap-2">
            <Button onClick={closeModal} styleType="danger">Cancel</Button>
            <Button onClick={() => checkOut({ workSessionId })}>Yes</Button>
        </div>
    </article>
}