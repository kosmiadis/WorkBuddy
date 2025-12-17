import { useEffect, useState } from "react";
import Container from "../ui/Container";
import { getTimeFrom, getTimeTill, getTimeWithSeconds } from "../../lib/dayjs";
import type { WorkSessionI } from "../../types/WorkSession";

type WorkStatusProps = {
    nextWorkSession: WorkSessionI | null | undefined;
}

export default function WorkStatus ({ nextWorkSession }: WorkStatusProps) {
    const [ timeTillNextShift, setTimeTillNextShift ] = useState<string>('');   
    const [ timeSinceCheckIn, setTimeSinceCheckIn ] = useState<string>('');   
    const [ currentTime, setCurrentTime] = useState<string>(getTimeWithSeconds(new Date()));
    
    useEffect(() => {
        if (nextWorkSession) {
            setTimeTillNextShift(getTimeTill(nextWorkSession.scheduledCheckInDate))
            setTimeSinceCheckIn(getTimeFrom(nextWorkSession.checkInDate!))
        }

        //if user checked out.
        if (!nextWorkSession) {
            setTimeTillNextShift('');
            setTimeSinceCheckIn('');
        }
    }, [nextWorkSession])

    
    useEffect(() => {
        const setCurrentTimeInterval = setInterval(() => {
            setCurrentTime(getTimeWithSeconds(new Date()));
        }, 1000)

        return () => {
            clearInterval(setCurrentTimeInterval);
        }
    }, [])

    // function handleNotifyMe () {
    //     //open modal with possible options:
    //     // 1. 1 day before
    //     // 2. 1 hours before
    //     // 3. (anything that is relative to the current date so it makes sense)
    //     //ex. if current date is half an hour before checkindate it must display values smaller than half an hour.
    // }

    return <Container>
        <div className="flex h-full flex-col justify-center items-center">
            <p className="text-4xl font-semibold text-muted-font">{currentTime}</p>

            {nextWorkSession && !nextWorkSession.hasCheckedIn && <p className=" text-sm text-center text-muted-font ">
                Next shift {timeTillNextShift}
            </p>}

            {nextWorkSession && nextWorkSession.hasCheckedIn && !nextWorkSession.hasCheckedOut && <p className=" text-sm text-center text-muted-font ">
                Checked in {timeSinceCheckIn}
            </p>}
            
            {/* <div className="mt-2.5">
                <Button onClick={handleNotifyMe}>Notify me</Button>
            </div> */}
        </div>
    </Container>
}