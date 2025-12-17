import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import paths from "../../config/paths";
import WorkSessionTableSkeleton from "../ui/Loading/WorkSessionTableSkeleton";
import { useGetWorkSessions } from "../../features/worksessions/hooks/useGetWorkSessions";
import WorkSessionsTable from "./WorkSessionsTable";

export default function DashboardWorkLog () {
    const { data: workSessions, isPending } = useGetWorkSessions({ limit: 5 });
    
    const navigate = useNavigate();

    function handleRedirectToWorkLog () {
        navigate('/'+paths.app.worklog.getPath())
    }

    if (isPending) return <WorkSessionTableSkeleton headings={['Date', 'Check In', 'Check Out']} />

    if (workSessions && !isPending) return <div>
        <div className="flex flex-col gap-4">
            <WorkSessionsTable showRealDates headings={['Date', 'Check In', 'Check Out']} workSessionList={workSessions!}/>
            <div className="ml-auto"><Button onClick={handleRedirectToWorkLog}>View All</Button></div>
        </div>
    </div>
}