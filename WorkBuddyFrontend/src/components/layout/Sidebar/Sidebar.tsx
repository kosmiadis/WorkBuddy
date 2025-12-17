import { useScreenSize } from "../../../hooks/useScreenSize";
import Navigation from "./Navigation";
import { X } from "lucide-react";
import { useMobileMenu } from "./MobileMenuStore";
import LogoutButton from "../../../features/auth/components/LogoutButton";

export default function Sidebar () {
    const { isMobile } = useScreenSize();
    const {closeMenu, isSidebarOpen} = useMobileMenu();

    if (isMobile) return <div className={`fixed z-200 ${isSidebarOpen ? 'right-0' : 'right-300'} top-0 w-min px-6 py-4 min-h-full bg-main-background`}>
        <div className="w-[200px] flex flex-col gap-2 my-2">
            <X className="text-main-font" onClick={closeMenu} size={28} />
            <Navigation />
            <LogoutButton />
        </div>
    </div>

    return <div className="bg-main-background px-2 flex flex-col gap-3">
        {/* <div className="px-2"><ProfilePreview /></div> */}
        <Navigation />
        {/* <ToggleTheme /> */}
    </div>
}