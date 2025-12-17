import Button from "../../../components/ui/Button";
import ConfirmationDialog from "../../../components/ui/ConfirmationDialog";
import { useModal } from "../../../store/useModal";
import { useDeleteAccount } from "../../auth/hooks/useDeleteAccount";
import SettingSection from "./ui/SettingSection";

export default function DeleteAccount () {
    const { openModal } = useModal();
    const { mutate: deleteAccount, isPending: isDeletingAccount } = useDeleteAccount();
    
    function handleDeleteAccount () {
        openModal(<ConfirmationDialog  isPending={isDeletingAccount} confirmFunction={deleteAccount} content="Are you sure you want to delete your account? This action is irreversable"/>, 'info');
    }
    
    return <SettingSection title="Delete Account">
        <Button styleType="danger" onClick={handleDeleteAccount}>Delete</Button>
    </SettingSection>
}