import endpoints from "../../../config/endpoints"
import paths from "../../../config/paths"
import API from "../../../lib/axios"

export async function me () {
    return (await API.get('/auth/'+paths.auth.me.getPath())).data.data
}

export async function login ({ email, password }: { email: string, password: string }) {

    
    return await API.post('/auth/'+paths.auth.login.getPath(), {
        email, 
        password 
    })
}

export async function register ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) {
    return await API.post('/auth/'+paths.auth.register.getPath(), {
        firstName,
        lastName,
        email, 
        password 
    })
}

export async function logout () {
    return await API.post(endpoints.auth.logout.getEndpoint({ query: undefined }))
}

export async function deleteAccount () {
    return await API.delete(endpoints.auth.delete.getEndpoint({ query: undefined }))
}