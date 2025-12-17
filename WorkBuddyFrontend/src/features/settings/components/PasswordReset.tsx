import Button from "../../../components/ui/Button";
import { useModal } from "../../../store/useModal";
import ResetPasswordFormDialog from "./ResetPasswordFormDialog";
import SettingSection from "./ui/SettingSection";

export default function PasswordReset () {

    const { openModal } = useModal();

    function handleResetPassword () {
        openModal(<ResetPasswordFormDialog />, 'info');
    }

    return <SettingSection title="Reset password">
        <Button onClick={handleResetPassword}>Reset password</Button>
    </SettingSection>
}