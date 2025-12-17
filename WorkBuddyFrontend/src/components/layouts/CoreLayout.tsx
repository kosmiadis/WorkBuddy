import { Outlet } from "react-router-dom";
import { useTheme } from "../../store/ThemeProvider";
import Sidebar from "../layout/Sidebar/Sidebar";

export default function CoreLayout () {
    const { theme } = useTheme();

    return <div className={`${theme} flex flex-col bg-main-background w-full min-h-screen text-nowrap`}>
        <div className="max-w-[900px] mx-auto mt-10 w-full grid tablet:grid-cols-[min-content_1fr]">
            <Sidebar />
            <main className="px-6 pt-2 pb-10">
                <Outlet />
            </main>
        </div>
    </div>  
}