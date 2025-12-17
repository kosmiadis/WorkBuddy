import endpoints from "../../../config/endpoints";
import API from "../../../lib/axios";

export async function getMonthlyGeneralReport () {
    return (await API.get(endpoints.analytics.monthlyGeneralReport.getEndpoint({ query: undefined }))).data.data
}

export async function getOverallReport () {
    return (await API.get(endpoints.analytics.overallReport.getEndpoint({ query: undefined }))).data.data
}