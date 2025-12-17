class Endpoint {    
    endpoint: string;
    
    constructor(
        endpoint: string
    ) {
        this.endpoint = endpoint;
    }

    getEndpoint () {
        return this.endpoint;
    }
}

export const endpoints = {
    auth: {
        login: new Endpoint('/login'),
        register: new Endpoint('/register'),
        me: new Endpoint('/me'),
        logout: new Endpoint('/logout'),
        delete: new Endpoint('/delete'),
        resetPassword: new Endpoint('/reset-password')
    },
    worksessions: {
        getWorkSessions: new Endpoint('/sessions'),
        createWorkSession: new Endpoint('/create'),
        editWorkSession: new Endpoint('/edit'),
        deleteWorkSession: new Endpoint('/delete'),
        checkIn: new Endpoint('/check-in'),
        checkOut: new Endpoint('/check-out'),
        getNextWorkSession: new Endpoint('/next-session')
    }
}