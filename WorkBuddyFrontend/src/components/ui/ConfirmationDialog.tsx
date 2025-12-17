import Button from "./Button";
import type { ReactNode } from "react";
import { useModal } from "../../store/useModal";
import type { UseMutateFunction } from "@tanstack/react-query";
type ConfirmationDialogProps = {
    content: string | ReactNode;
    confirmFunction: UseMutateFunction | Function;
    isPending: boolean;
}

export default function ConfirmationDialog ({content, isPending, confirmFunction}: ConfirmationDialogProps) {
        
    const { closeModal } = useModal();

    function handleConfirm () {
        confirmFunction();
        closeModal();
    }

    return <article className="flex flex-col gap-2">
        <h2>{content}</h2>
        <div className="flex justify-end items-center gap-2">
            <Button disabled={isPending} styleType="danger" onClick={closeModal}>Cancel</Button>
            <Button disabled={isPending} onClick={handleConfirm}>Yes</Button>
        </div>
    </article>
}