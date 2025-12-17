import { useAuth } from "../../store/useAuth";
import WorkStatus from "./CheckStatus";
import CheckInOutButton from "../../features/worksessions/components/CheckInOutButton";
import { useGetNextWorkSession } from "../../features/worksessions/hooks/useGetNextWorkSession";
import { useMonthlyGeneralReport } from "../../features/analytics/hooks/useMonthlyGeneralReport";
import MonthlyGeneralReport from "./MonthlyGeneralReport";

export default function TopBar () {

    const { user } = useAuth();
    const { data: nextWorkSession } = useGetNextWorkSession();
    const { data: monthlyReport, isPending } = useMonthlyGeneralReport();
    
    /* Check In / Out button is available only if time till check in is equal or less than 15 minutes */
    const checkInTimeDiffInMill = nextWorkSession ? new Date(nextWorkSession.scheduledCheckInDate).getTime() - new Date().getTime() : null;
    const differenceInMinutesTillWorkSession = checkInTimeDiffInMill ? Math.round(checkInTimeDiffInMill / (1000 * 60)) : null;
    console.log(differenceInMinutesTillWorkSession)
    return <div className="w-full flex items-center gap-4 flex-wrap justify-between">
        <div className="flex flex-col gap-2 justify-between w-full h-full">
            <div>
                <h1 className="text-xl">Welcome back, {user?.firstName} {user?.lastName.slice(0,1)}.</h1>
                <p className="text-sm text-muted-font">{new Date().toDateString()}</p>
            </div>
            <div>
                { differenceInMinutesTillWorkSession != null && differenceInMinutesTillWorkSession <= 15 && nextWorkSession && <CheckInOutButton nextWorkSession={nextWorkSession} /> }
            </div>
        </div>

        <div className="w-full grid grid-cols-1 tablet:grid-cols-2 gap-3">
            <WorkStatus nextWorkSession={nextWorkSession} />
            <MonthlyGeneralReport monthlyGeneralReport={monthlyReport} isLoading={isPending}/>
        </div>
    </div>
}