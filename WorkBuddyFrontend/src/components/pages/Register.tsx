import z from "zod";
import { useRegister } from "../../features/auth/hooks/useRegister";
import { displayNotification } from "../../lib/sonner";
import { validateData } from "../../util/validateData";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Input from "../ui/Input";
import { Link, useLocation } from "react-router-dom";
import paths from "../../config/paths";
import { useEffect, useState } from "react";

const registerCredentialsSchema = z.object({
    firstName: z.string().min(3, 'Please enter a valid firstname'),
    lastName: z.string().min(3, 'Please enter a valid lastname'),
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

export default function Register () {
    const { mutate, isPending } = useRegister();
    const [ redirectTo, setRedirectTo ] = useState<string | undefined>(undefined);

    const { search } = useLocation();

    useEffect(() => {
        if (search!='') {
            setRedirectTo(decodeURIComponent(search.split('=')[1]));
        }
    })
    function handleRegister (e: React.FormEvent) {
        e.preventDefault();
            //@ts-expect-error
            const formData: z.infer<registerCredentialsSchema> = new FormData(e.target);
            
            const credentials = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password')
            }
            const { isValid, errorMessages } = validateData(credentials, registerCredentialsSchema);
            
            if (!isValid) {
                console.log(errorMessages);
                for (const errMsg of errorMessages){
                    displayNotification(errMsg, 'error')
                }
                return
            }
    
            mutate(credentials);
    }
    
    return <Container>
        <div className="flex flex-col gap-0.5 mb-2">
            <h2 className="text-lg">Welcome to WorkBuddy</h2>
            <p className="text-muted-font">Create an account</p>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input name="firstName" label="First Name" placeholder="John" type="text" />
            <Input name="lastName" label="Last Name" placeholder="Doe" type="text" />
            <Input name="email" label="Email" placeholder="example@gmail.com" type="email" />
            <Input name="password" label="Password" type="password" placeholder="12345678" />

            <div className="flex items-center text-sm gap-2">
                <p>Already have an account?</p>
                <Link to={'/auth'+paths.auth.login.getAbsoluteRoutedPath(redirectTo)}>Login</Link>
            </div>

            <Button disabled={isPending}>Register</Button>
        </form>
    </Container>
}