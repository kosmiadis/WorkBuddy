import { PlusIcon } from "lucide-react";
import { useModal } from "../../store/useModal";
import Button from "../ui/Button";
import CreateWorkSessionForm from "../../features/worksessions/components/CreateWorkSessionForm";
import WorkSessionsTable from "../Dashboard/WorkSessionsTable";
import WorkSessionTableSkeleton from "../ui/Loading/WorkSessionTableSkeleton";
import { useGetWorkSessions } from "../../features/worksessions/hooks/useGetWorkSessions";

export default function WorkLog () {
    const { openModal } = useModal();
    
    const { data: workSessions, isPending } = useGetWorkSessions({ limit: 0 });

    function handleCreateSessionClick () {
        openModal(<CreateWorkSessionForm />, 'form', 'Add new work session');
    }
    return <div className="flex flex-col gap-4">

        <div>
            <Button onClick={handleCreateSessionClick} >
                <div className="flex items-center">
                    Create <PlusIcon size={18} />
                </div> 
            </Button>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">Scheduled Work Sessions</h1>
            {isPending ? <WorkSessionTableSkeleton headings={['Date', 'Check In', 'Check Out']}/>
            
            : <WorkSessionsTable showRealDates withPagination headings={['Date', 'Check In', 'Check Out']} workSessionList={workSessions!} />
            }
        </div>
    
    </div>
}