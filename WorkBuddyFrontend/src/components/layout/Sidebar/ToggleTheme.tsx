import { useTheme } from "../../../store/ThemeProvider";
import Switch from "../../ui/Switch";
import { Sun , Moon } from 'lucide-react';

export default function ToggleTheme () {
    const { theme, toggleTheme } = useTheme();
    const isSwitched = localStorage.getItem("theme") === 'dark';

    return <div className="p-2 flex items-center gap-1">
        <Switch isSwitched={isSwitched} triggerFn={toggleTheme} />
        <p className="text-sm">{theme == 'light' ? <Sun size={18} /> : <Moon size={18} />}</p>
    </div>
}