import type { WorkSessionI } from "../../../types/WorkSession"
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { validateData } from "../../../util/validateData";
import { displayNotification } from "../../../lib/sonner";
import { useEditWorkSession } from "../hooks/useEditWorkSession";
import { useDeleteWorkSession } from "../hooks/useDeleteWorkSession";
import Separator from "../../../components/ui/Separator";
import { useModal } from "../../../store/useModal";
import { workSessionSchema } from "../types/WorkSessionSchema";
import { getFullDate, getTime } from "../../../lib/dayjs";
import dayjs from "dayjs";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

type WorkSessionPreviewProps = {
    workSession: WorkSessionI;
}

export default function WorkSessionPreview ({ workSession: { 
    _id,
    scheduledCheckInDate,
    scheduledCheckOutDate,
    hasCheckedIn,
    hasCheckedOut,
    checkInDate,
    checkOutDate,
    createdAt,
    updatedAt

} }: WorkSessionPreviewProps) {
    const { openModal, closeModal } = useModal();
    const { mutate: editWorkSession, isPending: isSavingChanges } = useEditWorkSession();
    const { mutate: deleteWorkSession, isPending: isDeleting } = useDeleteWorkSession();

    const initialData = {
        scheduledCheckInDate, 
        scheduledCheckOutDate,
        checkInDate,
        checkOutDate
    }

    function handleWorkSessionEdit (e: React.FormEvent) {
        e.preventDefault();
        
        //@ts-expect-error
        const formData: z.infer<workSessionSchema> = new FormData(e.target);
        
        const [ year, month, day ] = formData.get('workDate').split('-');
        const [ scheduledCheckInHours, scheduledCheckInMinutes ] = formData.get('scheduledCheckInTime').split(':');
        const [ scheduledCheckOutHours, scheduledCheckOutMinutes ] = formData.get('scheduledCheckOutTime').split(':');

        const workSessionBody: {
            scheduledCheckInDate?: string,
            scheduledCheckOutDate?: string,
            checkInDate?: string,
            checkOutDate?: string
        } = {};

        if (hasCheckedIn && hasCheckedOut) {
            const checkInTime = formData.get('checkInTime').split(':');
            workSessionBody.checkInDate = new Date(year, month, day, checkInTime[0], checkInTime[1]).toISOString();

            const checkOutTime = formData.get('checkOutTime').split(':');
            workSessionBody.checkOutDate = new Date(year, month, day, checkOutTime[0], checkOutTime[1]).toISOString();  
        }

        const scheduledCheckInDate = new Date(year, month-1, day, scheduledCheckInHours, scheduledCheckInMinutes).toISOString();
        const scheduledCheckOutDate = new Date(year, month-1, day, scheduledCheckOutHours, scheduledCheckOutMinutes).toISOString();

        workSessionBody.scheduledCheckInDate = scheduledCheckInDate
        workSessionBody.scheduledCheckOutDate = scheduledCheckOutDate

        console.log('worksessionbody: ', workSessionBody);

        /*
            Check if there is any update 
         */

        if (new Date(initialData.scheduledCheckInDate).toISOString() == scheduledCheckInDate
        && new Date (initialData.scheduledCheckOutDate).toISOString() == scheduledCheckOutDate
        ) {

            if (!hasCheckedIn && !hasCheckedOut) {
                displayNotification('No updates to save', 'info');
                return;
            }

            //work session has ended
            if (new Date (initialData.checkInDate!).toISOString() == scheduledCheckOutDate
                && new Date (initialData.checkOutDate!).toISOString() == scheduledCheckOutDate) 
            {
                displayNotification('No updates to save', 'info');
                return;
            }
        }
        const { isValid, errorMessages } = validateData({ dateRange: workSessionBody }, workSessionSchema);
        
        if (!isValid) {
            for (const errMsg of errorMessages){
                displayNotification(errMsg, 'error')
            }
            return;
        }

        //@ts-ignore
        editWorkSession({ workSessionId: _id,  ...workSessionBody });
    }

    function handleWorkSessionDelete (e:React.FormEvent) {
        e.preventDefault();
        openModal(<DeleteConfirmationDialog deleteWorkSession={deleteWorkSession} workSessionId={_id} />,'info');
        // deleteWorkSession({ workSessionId: _id })
    }

    return <div className="flex flex-col gap-2">
        <div className="mb-4 flex flex-col">
            <h3 className="text-main-font text-lg">Edit Work Session</h3>
            {hasCheckedIn && hasCheckedOut && <p className="text-sm text-muted-font">You can edit real check in / out time.</p>}
        </div>
        {/* form works for both preview and edit */}
        <form onSubmit={handleWorkSessionEdit} className="flex flex-col gap-4 backdrop-blur-3xl">
            <div className="flex flex-col gap-4">
                <Input name="workDate" defaultValue={dayjs(scheduledCheckInDate).format('YYYY-MM-DD')} type="date" label="Date"/>
                <div className="grid grid-cols-2 gap-2">
                    <Input name="scheduledCheckInTime"  type="time" defaultValue={getTime(scheduledCheckInDate)} label="From"/>
                    <Input name="scheduledCheckOutTime" type="time" defaultValue={getTime(scheduledCheckOutDate)} label="Till" />
                </div>
                <Separator />
                {/* Real check in / out dates edit will be available when work session ends */}
                {hasCheckedIn && hasCheckedOut && 
                    <div className="flex flex-col gap-2">
                        <Input type="time" name="checkInTime" defaultValue={getTime(checkInDate!)} label="Check In"/>
                        <Input type="time" name="checkOutTime" defaultValue={getTime(checkOutDate!)} label="Check Out"/>
                    </div>
                }

                <Separator />
                <div className="flex flex-col gap-2">
                    <Input type="text" value={getFullDate(createdAt)} readOnly label="Created at"/>
                    <Input type="text" value={getFullDate(updatedAt)} readOnly label="Last updated at"/>
                </div>

                
                
            </div>

            {/* User cannot edit work session while shift is active */}
            {hasCheckedIn && !hasCheckedOut && <p className="text-sm text-justify text-red-400"> You cannot edit or delete work session while shift is active.</p>}
            
            
            <div className="flex justify-end gap-2">
                <Button type='button' disabled={isSavingChanges || isDeleting} onClick={closeModal}>Close</Button>
                <Button type="submit" disabled={(isSavingChanges || isDeleting) || (hasCheckedIn && !hasCheckedOut)}>Save</Button>
                <Button styleType="danger" type="button" disabled={(isSavingChanges || isDeleting) || (hasCheckedIn && !hasCheckedOut)} onClick={handleWorkSessionDelete}>Delete</Button>
            </div>
        </form>
    </div>
}