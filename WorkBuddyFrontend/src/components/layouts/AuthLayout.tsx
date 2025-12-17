import { Outlet } from "react-router-dom";

export default function AuthLayout () {    
    return <div className={`flex flex-col gap-2 justify-center items-center min-h-screen`}>

        <h1 className="text-2xl font-bold">WorkBuddy</h1>
        <main className="max-w-[350px]">
            <Outlet />
        </main>
    </div>
}