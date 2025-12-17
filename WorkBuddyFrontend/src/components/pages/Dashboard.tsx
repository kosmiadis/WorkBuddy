import TopBar from "../Dashboard/TopBar";
import DashboardWorkLog from "../Dashboard/DashboardWorkLog";

export default function Dashboard () {
    return <div className="flex flex-col gap-2">

        <div className="flex flex-col gap-4">
            <div className="col-start-1 -col-end-1">
                <TopBar />
            </div>

            <DashboardWorkLog />            
        </div>

    </div>
}