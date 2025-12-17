import Container from "../ui/Container";
import dayjs from "dayjs";
import { months } from "../../util/months";
import LoadingSpinner from "../ui/Loading/LoadingSpinner";

export type MonthlyGeneralReportI = { 
    totalRealWorkDays: number,
    totalRealWorkHours: number,
    totalScheduledWorkDays: number,
    totalScheduledWorkHours: number,
}

export default function MonthlyGeneralReport ({ monthlyGeneralReport, isLoading }: { monthlyGeneralReport: MonthlyGeneralReportI | null, isLoading: boolean}) {
    if (isLoading) return <Container>
        <div className="flex flex-col gap-1 items-center">
            <p>Loading report...</p>
            <LoadingSpinner />
        </div>
    </Container>


    return <Container>
        <div className="flex flex-col justify-between w-full h-full">
            {monthlyGeneralReport ? <div className="flex flex-col gap-2">
                <h3 className="text-main-font font-semibold text-lg">Viewing { months[dayjs(new Date()).month()]}</h3>
                <article>
                    <h3>Real/Scheduled Hours</h3>
                    <p>{monthlyGeneralReport.totalRealWorkHours.toFixed(2)}/{monthlyGeneralReport.totalScheduledWorkHours} <span>hrs</span></p>
                </article>
                <article>
                    <h3>Earned/Expected Earning</h3>
                    <p>${(monthlyGeneralReport.totalRealWorkHours * 4.5).toFixed(2)}/{(monthlyGeneralReport.totalScheduledWorkHours*4.5).toFixed(2)}</p>
                </article>
            </div>
            :    
            <>
                <span className="text-muted-font m-auto text-wrap text-center text-sm p-4">Not enought data for quick insights.</span>
            </>
            }
    </div>
    </Container>
    
}