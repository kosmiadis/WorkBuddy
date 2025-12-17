import z from "zod";
import { validateData } from "../../util/validateData";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Input from "../ui/Input";
import { useLogin } from "../../features/auth/hooks/useLogin";
import { displayNotification } from "../../lib/sonner";
import { Link, useLocation } from "react-router-dom";
import paths from "../../config/paths";
import { useEffect, useState } from "react";

const loginCredentialsSchema = z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters')
})


export default function Login () {
    const { mutate, isPending } = useLogin();
    const [ redirectTo, setRedirectTo ] = useState<string | undefined>(undefined);

    const { search } = useLocation();

    useEffect(() => {
        if (search!='') {
            setRedirectTo(decodeURIComponent(search.split('=')[1]));
        }
    })


    function handleLogin (e: React.FormEvent) {
        e.preventDefault();
        //@ts-expect-error
        const formData: z.infer<loginCredentialsSchema> = new FormData(e.target);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        const { isValid, errorMessages } = validateData(credentials, loginCredentialsSchema);
        
        if (!isValid) {
            console.log(errorMessages);
            for (const errMsg of errorMessages){
                displayNotification(errMsg, 'error')
            }
            //display "errorMessages"
            return
        }

        mutate(credentials);
    }
    
    return <Container>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
                <h2 className="text-lg">Welcome back</h2>
                <p className="text-muted-font">Login to your account</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input name="email" label="Email" placeholder="example@gmail.com" type="email" />
                <Input name="password" label="Password" type="password" placeholder="12345678" />

                <div className="flex items-center text-sm gap-2">
                    <p>Don't have an account?</p>
                    <Link to={'/auth'+paths.auth.register.getAbsoluteRoutedPath(redirectTo)}>Register</Link>
                </div>

                <Button disabled={isPending}>Login</Button>
            </form>
        </div>
    </Container>
}