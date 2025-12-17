import type { UseMutateFunction } from "@tanstack/react-query";
import { useModal } from "../../../store/useModal";
import Button from "../../../components/ui/Button";

type DeleteConfirmationDialogProps = {
    deleteWorkSession: UseMutateFunction<any, Error, { workSessionId: string; }, unknown>;
    workSessionId: string;
}

export default function DeleteConfirmationDialog ({ deleteWorkSession, workSessionId }: DeleteConfirmationDialogProps) {
     const { closeModal } = useModal();
    return <article className="flex flex-col gap-2">
            <h2>Are you sure you want to delete this work session?</h2>
            <div className="flex justify-end items-center gap-2">
                <Button onClick={closeModal} styleType="danger">Cancel</Button>
                <Button onClick={() => deleteWorkSession({ workSessionId })}>Yes</Button>
            </div>
        </article>
}