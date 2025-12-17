import { useModal } from "../../../store/useModal";
import Button from "../../../components/ui/Button";
import type { UseMutateFunction } from "@tanstack/react-query";

type LogoutConfirmationDialogProps = {
    logout: UseMutateFunction;
}

export default function LogoutConfirmationDialog ({ logout }: LogoutConfirmationDialogProps) {
    const { closeModal } = useModal();

    return <article className="flex flex-col gap-2">
            <h2>Are you sure you want to logout?</h2>
            <div className="flex justify-end items-center gap-2">
                <Button onClick={closeModal} styleType="danger">Cancel</Button>
                <Button onClick={() => {
                    closeModal();
                    logout();
                }}>Yes</Button>
            </div>
        </article>
}