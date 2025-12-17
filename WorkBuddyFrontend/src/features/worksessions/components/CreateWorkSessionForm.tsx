import z from "zod";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { validateData } from "../../../util/validateData";
import { useCreateWorkSession } from "../hooks/useCreateWorkSession";
import { useModal } from "../../../store/useModal";
import { displayNotification } from "../../../lib/sonner";
import { workSessionSchema } from "../types/WorkSessionSchema";

export default function CreateWorkSessionForm () {
    
    const { mutate: createWorkSession, isPending } = useCreateWorkSession();
    const { closeModal } = useModal();

    function handleWorkSessionCreate (e: React.FormEvent) {
            e.preventDefault();
            //@ts-expect-error
            const formData: z.infer<workSessionSchema> = new FormData(e.target);
            
            const [ year, month, day ] = formData.get('workDate').split('-');
            const [ checkInHours, checkInMinutes ] = formData.get('scheduledCheckInTime').split(':');
            const [ checkOutHours, checkOutMinutes ] = formData.get('scheduledCheckOutTime').split(':');

            const scheduledCheckInDate = new Date(`${year}/${month}/${day} ${checkInHours}:${checkInMinutes}:00`)
            const scheduledCheckOutDate = new Date(`${year}/${month}/${day} ${checkOutHours}:${checkOutMinutes}:00`)

            const workSessionBody = {
                scheduledCheckInDate,
                scheduledCheckOutDate
            }
            
            const { isValid, errorMessages } = validateData({ dateRange: workSessionBody }, workSessionSchema);

            if (!isValid) {
                for (const errMsg of errorMessages){
                    displayNotification(errMsg, 'error')
                }
                return
            }
            createWorkSession(workSessionBody);
    }
    
    return <form onSubmit={handleWorkSessionCreate} className="flex flex-col gap-4 backdrop-blur-3xl">
        <div className="flex flex-col gap-4">
            <Input name="workDate" placeholder={new Date().toDateString()} type="date" label="Date"/>
            <div className="grid grid-cols-2 gap-2">
                <Input name="scheduledCheckInTime" type="time" placeholder={new Date().toTimeString()} label="From"/>
                <Input name="scheduledCheckOutTime" type="time" placeholder={new Date().toTimeString()} label="Till" />
            </div>
        </div>
        <div className="flex justify-end gap-2">
            <Button type='button' disabled={isPending} onClick={closeModal} styleType="danger">Close</Button>
            <Button disabled={isPending}>Create</Button>
        </div>
    </form>
}