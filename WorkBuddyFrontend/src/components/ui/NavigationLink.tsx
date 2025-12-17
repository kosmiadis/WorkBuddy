import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useMobileMenu } from "../layout/Sidebar/MobileMenuStore";

interface NavigationLinkI extends LinkProps {
    isActive?: boolean;
    children: ReactNode;
}

export default function NavigationLink ({isActive=false, children, ...props}: NavigationLinkI) {

    const { isMobile } = useScreenSize();
    const { isSidebarOpen, closeMenu } = useMobileMenu();

    function handleOnClick () {
        if (isMobile && isSidebarOpen) {
            closeMenu();
        }
    }


    return <Link className={`${isActive ? 'bg-secondary-background' : 'bg-main-background'} px-3 py-2 rounded-md hover:bg-secondary-background text-muted-font text-sm text-roboto`} {...props} onClick={handleOnClick}>
        {children}
    </Link>
}