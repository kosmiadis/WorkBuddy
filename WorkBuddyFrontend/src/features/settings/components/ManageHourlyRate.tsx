import Button from "../../../components/ui/Button";
import { useAuth } from "../../../store/useAuth";
import { useModal } from "../../../store/useModal";
import ManageHourlyRateFormDialog from "./ManageHourlyRateFormDialog";
import SettingSection from "./ui/SettingSection";

export default function ManageHourlyRate () {

    const { openModal } = useModal();
    const { user } = useAuth();
    function handleAddRate () {
        openModal(<ManageHourlyRateFormDialog />, 'form');
    }

    return <SettingSection title={`Hourly Rate ${user?.selectedHourlyRate ? user?.selectedHourlyRate+'$': '(not defined)'}`}>
        <Button onClick={handleAddRate}>Update Rate</Button>
    </SettingSection>
}