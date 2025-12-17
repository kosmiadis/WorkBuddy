import endpoints from "../../../config/endpoints";
import API from "../../../lib/axios";

export async function addHourlyRate ({ hourlyRate }: { hourlyRate: number }) {
    return (await API.post(endpoints.settings.addHourlyRate.getEndpoint({ query: undefined }), { hourlyRate })).data.data;
}