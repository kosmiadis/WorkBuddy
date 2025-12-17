class Endpoint {
    endpoint: string;

    constructor (endpoint: string) {
        this.endpoint = endpoint;
    }

    getEndpoint({ query }: {query?: {name: string, value: string | number } | undefined }) {
        return query ? `${this.endpoint}?${query.name}=${query.value}` : this.endpoint;
    }
}

const endpoints = {
    worksessions: {
        getWorkSessions: new Endpoint('/sessions'),
        createWorkSession: new Endpoint('/create'),
        editWorkSession: new Endpoint('/edit'),
        deleteWorkSession: new Endpoint('/delete'),
        checkInWorkSession: new Endpoint('/worksession/check-in'),
        checkOutWorkSession: new Endpoint('/worksession/check-out'),
        getNextWorkSession: new Endpoint('/next-session')
    },
    auth: {
        login: new Endpoint('/auth/login'),
        register: new Endpoint('/auth/register'),
        me: new Endpoint('/auth/me'),
        logout: new Endpoint('/auth/logout'),
        delete: new Endpoint('/auth/delete'),
        resetPassword: new Endpoint('/auth/reset-password')
    },
    analytics: {
        monthlyGeneralReport: new Endpoint('/analytics/monthly-general-report'),
        overallReport: new Endpoint('/analytics/overall-report')
    },
    settings: {
        addHourlyRate: new Endpoint('/settings/hourly-rate'),
    }
}

export default endpoints;