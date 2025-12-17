import ToggleTheme from "../../../components/layout/Sidebar/ToggleTheme";
import SettingSection from "./ui/SettingSection";

export default function ThemeSetting () {
    return <SettingSection title="Theme">
        <ToggleTheme />
    </SettingSection>
}