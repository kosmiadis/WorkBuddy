import endpoints from "../../../config/endpoints"
import API from "../../../lib/axios"
import type { WorkSessionI } from "../../../types/WorkSession"

// limit declares how many documents should the request return at most.
export async function getWorkSessions ({ limit }: { limit: number}): Promise<WorkSessionI[]> {
    return await (await API.get('/worksession' + endpoints.worksessions.getWorkSessions.getEndpoint({ query: { name: 'limit', value: limit } }))).data.data
}

export async function createWorkSession (workSession: {scheduledCheckInDate: Date, scheduledCheckOutDate: Date}) {
    return await API.post('/worksession'+endpoints.worksessions.createWorkSession.getEndpoint({ query: undefined }), workSession)

}

export async function editWorkSession (workSession: {workSessionId: string, scheduledCheckInDate?: Date, scheduledCheckOutDate: Date, checkInDate?: Date, checkOutDate?: Date}) {
    return await API.put('/worksession'+endpoints.worksessions.editWorkSession.getEndpoint({ query: { name: 'id', value: workSession.workSessionId} }), workSession)
}

export async function deleteWorkSession ({ workSessionId }: {workSessionId: string}) {
    return await API.delete('/worksession'+endpoints.worksessions.deleteWorkSession.getEndpoint({ query: { name: 'id', value: workSessionId } }))
}

export async function checkInWorkSession ({ workSessionId }: {workSessionId: string}) {
    return (await API.post(endpoints.worksessions.checkInWorkSession.getEndpoint({ query: { name: 'id', value: workSessionId }}))).data
}

export async function checkOutWorkSession ({ workSessionId }: {workSessionId: string}) {
    return (await API.post(endpoints.worksessions.checkOutWorkSession.getEndpoint({ query: { name: 'id', value: workSessionId }}))).data
}

export async function getNextWorkSession (): Promise<WorkSessionI> {
    return (await API.get('/worksession' + endpoints.worksessions.getNextWorkSession.getEndpoint({ query: undefined }))).data.data.nextWorkSession
}

