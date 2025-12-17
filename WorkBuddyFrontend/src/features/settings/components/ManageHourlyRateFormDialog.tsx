import z from "zod";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { displayNotification } from "../../../lib/sonner";
import { useModal } from "../../../store/useModal";
import { useHourlyRate } from "../hooks/useHourlyRate";
import { validateData } from "../../../util/validateData";
import { useAuth } from "../../../store/useAuth";

const hourlyRateSchema = z.object({
    hourlyRate: z.number().min(0, 'Hourly rate must be greater or equal to 0')
})

export default function ManageHourlyRateFormDialog () {
    const { closeModal } = useModal();
    const { } = useAuth();
    const { mutate: addRate } = useHourlyRate();
    
    function handleAddHourlyRate (e: React.FormEvent) {
        e.preventDefault();
        //@ts-expect-error
        const formData = new FormData(e.target);

        const hourlyRateBody = {
            hourlyRate: formData.get('hourlyRate')
        }

        if ((hourlyRateBody?.hourlyRate as string).trim() == '') {
            displayNotification('Please fill in hourly rate', 'error');
            return;
        }

        //@ts-ignore
        const { isValid, errorMessages } = validateData({ hourlyRate: parseFloat(hourlyRateBody.hourlyRate) }, hourlyRateSchema);
        
        if (!isValid) {
            for (const errMsg of errorMessages){
                displayNotification(errMsg, 'error')
            }
            return
        }

        //@ts-ignore
        addRate({ hourlyRate: hourlyRateBody.hourlyRate as number })
    }

    return <article className="flex flex-col gap-3">
        <h2 className="text-lg">Update Hourly Rate</h2>
        <form onSubmit={handleAddHourlyRate} className="flex flex-col gap-3">
 
            <span className="text-main-font text-xs">Hourly rate will be aplied for new work sessions not for the existing ones. </span>
            <div className="flex flex-col gap-4">
                <Input name="hourlyRate" type="number" step={0.1} label="Enter hourly rate"/>
            </div>

            <div className="flex justify-end items-center gap-2">   
                <Button type="button" onClick={closeModal} styleType="danger">Close</Button>
                <Button>Add</Button>
            </div>
        </form>
        
    </article>
}