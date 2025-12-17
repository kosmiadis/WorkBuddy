import axios, { type AxiosResponse } from "axios";
import { config } from "../config/config";
import { displayNotification } from "./sonner";

const API = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
})


function onFullFilled (response: AxiosResponse) {
    // displayNotification(response.data.message, 'success');
    return response;
}

function onRejected (err) {
    
    let errorMessages = err.response.data.error.errorMessages
    if (errorMessages) {
        for (let msg of errorMessages) {
            displayNotification(msg, 'error');
        }
    }

    throw err;
}
//handling success and error responses.
API.interceptors.response.use(onFullFilled, onRejected)  

export default API;