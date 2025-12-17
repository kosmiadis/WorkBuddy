import { useTheme } from "../../../store/ThemeProvider"
import LoadingSpinner from "./LoadingSpinner";

export default function Loading () {
    const { theme } = useTheme();
    return <div className={`${theme} min-h-screen w-full flex items-center justify-center`}>
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">WorkBuddy</h2>
            <LoadingSpinner />
        </div>
    </div> 
}