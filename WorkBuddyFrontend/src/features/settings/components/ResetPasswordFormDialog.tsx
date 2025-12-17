import z from "zod";
import Button from "../../../components/ui/Button";
import { useModal } from "../../../store/useModal"
import { validateData } from "../../../util/validateData";
import { displayNotification } from "../../../lib/sonner";
import { useResetPassword } from "../../auth/hooks/useResetPassword";
import Input from "../../../components/ui/Input";

const passwordResetSchema = z.object({
    resetPassword: z.object({
        currentPassword: z.string(),
        newPassword: z.string()
    })}
).refine((data) => data.resetPassword.currentPassword.length >= 8 && data.resetPassword.newPassword.length >= 8, {
    path: ['resetPassword'],
    message: 'Password must be at least 8 characters'
})



export default function ResetPasswordFormDialog () {
    const { closeModal } = useModal();
    const { mutate: resetPassword } = useResetPassword();
    
    function handleResetPassword (e: React.FormEvent) {
        e.preventDefault();
        //@ts-expect-error
        const formData = new FormData(e.target);
        
        const resetPasswordBody = {
            currentPassword: formData.get('currentPassword'),
            newPassword: formData.get('newPassword'),
        }   

        if ((resetPasswordBody?.currentPassword as string).trim() == '' || (resetPasswordBody?.newPassword as string).trim() == '') {
            displayNotification('Please fill in empty inputs', 'error');
            return;
        }

        const { isValid, errorMessages } = validateData({ resetPassword: resetPasswordBody }, passwordResetSchema);
        
        if (!isValid) {
            for (const errMsg of errorMessages){
                displayNotification(errMsg, 'error')
            }
            return
        }
        resetPassword({ currentPassword: resetPasswordBody.currentPassword as string, newPassword: resetPasswordBody.newPassword as string })
        
    }

    
    return <article className="flex flex-col gap-3">
        <h2 className="text-lg">Password reset</h2>
        <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
 
            <div className="flex flex-col gap-4">
                <Input name="currentPassword" type="password" label="Enter password"/>
                <Input name="newPassword" type="password" label="Enter new password"/>
            </div>

            <div className="flex justify-end items-center gap-2">   
                <Button type="button" onClick={closeModal} styleType="danger">Close</Button>
                <Button>Reset</Button>
            </div>
        </form>
        
    </article>
}