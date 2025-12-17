import endpoints from "../../../config/endpoints";
import API from "../../../lib/axios";

export type resetPasswordProps = { 
    currentPassword: string;
    newPassword: string;
}
export async function resetPassword ({ currentPassword, newPassword }: resetPasswordProps) {
    return await API.post(endpoints.auth.resetPassword.getEndpoint({ query: undefined }), {
        currentPassword,
        newPassword
    })
}