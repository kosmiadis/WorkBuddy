import { useMobileMenu } from "../../../components/layout/Sidebar/MobileMenuStore";
import Button from "../../../components/ui/Button";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useModal } from "../../../store/useModal";
import { useLogout } from "../hooks/useLogout";
import LogoutConfirmationDialog from "./LogoutConfirmationDialog";

export default function LogoutButton () {
    const { isOpen, openModal } = useModal();
    const { mutate: logout } = useLogout();
    const { isMobile } = useScreenSize();
    const { isSidebarOpen, closeMenu } = useMobileMenu();


    function handleOnClick () {
        if (isMobile && isSidebarOpen) {
            closeMenu();
        }
        openModal(<LogoutConfirmationDialog logout={logout} />, 'info');
    }

    return <Button disabled={isOpen} onClick={handleOnClick}>Logout</Button>
}