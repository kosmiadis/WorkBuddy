import { useEffect, useState, type HTMLAttributes } from "react";
import Separator from "../ui/Separator";
import type { WorkSessionI } from "../../types/WorkSession";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { useModal } from "../../store/useModal";
import WorkSessionPreview from "../../features/worksessions/components/WorkSessionPreview";

import dayjs from "dayjs";
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface TableI extends HTMLAttributes<HTMLTableElement> {
    headings: string[];
    workSessionList: WorkSessionI[];
    withPagination?: boolean;
    showRealDates?: boolean;
    title?: string;
}

interface WorkSessionRowI {
    scheduledCheckInDate: Date;
    scheduledCheckOutDate: Date;
    checkInDate?: Date;
    checkOutDate?: Date;
    showRealDates?: boolean;
}

function WorkSessionRow ({ scheduledCheckInDate, scheduledCheckOutDate, checkInDate, checkOutDate, showRealDates }: WorkSessionRowI) {
    const checkIn = dayjs(showRealDates && checkInDate ? checkInDate : scheduledCheckInDate).format('HH:mm');
    const checkOut = dayjs(showRealDates && checkOutDate ? checkOutDate : scheduledCheckOutDate).format('HH:mm');

    return <>
        <p>{months[new Date(scheduledCheckInDate).getMonth()].slice(0,3)} {new Date(scheduledCheckInDate).getDate()}</p>
        <p>{checkIn}</p>
        <p>{checkOut}</p>
    </>
}


// function PaginationControl

export default function WorkSessionsTable ({ headings, workSessionList,title ,withPagination=false, showRealDates=false }: TableI) {
    
    const sessionsPerPage = 5;
    const [ currentPage, setCurrentPage ] = useState(0);
    const totalPages =  Math.floor(workSessionList.length / sessionsPerPage) + ((workSessionList.length % sessionsPerPage) > 0 ? 1 : 0);
    const [ displayedWorkSessions, setDisplayedWorkSessions ] = useState(withPagination? workSessionList.slice((currentPage*sessionsPerPage), (currentPage+1)*sessionsPerPage) : workSessionList)
    const { openModal } = useModal();


    useEffect(() => {
        setDisplayedWorkSessions(withPagination? workSessionList.slice((currentPage*sessionsPerPage), (currentPage+1)*sessionsPerPage) : workSessionList)
    }, [currentPage, workSessionList])

    function handleWorkSessionClick (workSession: WorkSessionI) {
        // WorkSessionPreview component
        //@ts-ignore
        openModal(<WorkSessionPreview workSession={workSession}/>, 'info', '')
    }


    return <Container> 
        {title && title.trim() !== '' && <h1 className="text-main-font font-semibold">{title}</h1>}
        {displayedWorkSessions.length > 0 ? <>
        <ul className="flex flex-col gap-1">
            <li className={`grid grid-cols-3 p-2`}>
                {headings.map(heading => <h3 className="text-sm" key={heading}>{heading}</h3>)}
            </li>

            <Separator />
            {displayedWorkSessions.map(workSession => <li onClick={() => handleWorkSessionClick(workSession)} key={workSession._id} className={`${showRealDates && workSession.hasCheckedIn && workSession.hasCheckedOut ? 'odd:bg-green-500/20 even:bg-green-800/20' : showRealDates && workSession.hasCheckedIn && !workSession.hasCheckedOut ? 'even:bg-yellow-200/20 odd:bg-yellow-300/20': 'odd:bg-main-background even:bg-secondary-background'} hover:cursor-pointer hover:brightness-80 grid p-2 rounded-md  grid-cols-3 text-[15px]`}>
                <WorkSessionRow showRealDates={showRealDates && workSession.hasCheckedIn} {...workSession} />
            </li>)}
        </ul>
        {withPagination && totalPages > 1 && 
            <div className="mt-4 flex items-center justify-end gap-2">
                <Button onClick={() => setCurrentPage((prev) => prev > 0 ? prev-1 : prev)}>
                    <ChevronLeft size={18}/>
                </Button>
                <span className="text-main-font">Page {currentPage+1} of {totalPages}</span>
                <Button onClick={() => setCurrentPage((prev) => prev < totalPages-1 ? prev+1 : prev)}>
                    <ChevronRight size={18}/>
                </Button>
            </div>
        }</> : 
        <div>
            <h2 className="text-muted-font text-sm text-center">No work sessions.</h2>
        </div>
        }
        
    </Container>
}