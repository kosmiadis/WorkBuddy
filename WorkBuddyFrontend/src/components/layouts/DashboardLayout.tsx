import { Outlet } from "react-router-dom";
import StatusBar from "../layout/StatusBar/StatusBar";

export default function DashboardLayout () {
    return <div className="flex flex-col gap-4">
        <StatusBar />
        <main>
            <Outlet />
        </main>
    </div>
}