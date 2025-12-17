import { useLocation } from "react-router-dom";
import { toCamelCase } from "../../../util/toCamelCase";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { Menu } from "lucide-react";
import { useMobileMenu } from "../Sidebar/MobileMenuStore";
import LogoutButton from "../../../features/auth/components/LogoutButton";

export default function StatusBar () {
    const location = useLocation();
    const heading = toCamelCase(location.pathname.slice(1));    
    const { isMobile } =useScreenSize();
    const { openMenu } = useMobileMenu();

    return <div className="flex justify-between items-center"> 
        <h2>{heading}</h2>
        <div className="flex gap-2">
            {isMobile ? <Menu className="text-main-font" size={28} onClick={openMenu}/>
            : <LogoutButton />
            }
        </div>
    </div>
}
