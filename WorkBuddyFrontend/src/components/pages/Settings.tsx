import DeleteAccount from "../../features/settings/components/DeleteAccount";
import ManageHourlyRate from "../../features/settings/components/ManageHourlyRate";
import PasswordReset from "../../features/settings/components/PasswordReset";
import ThemeSetting from "../../features/settings/components/ThemeSetting";

export default function Settings () {
    return <div className="flex flex-col gap-2"> 
        <ThemeSetting />
        <ManageHourlyRate />
        <PasswordReset />
        <DeleteAccount />
    </div>
}