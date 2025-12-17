import z, { check } from "zod"

export const workSessionSchema = z.object({
    dateRange: z.object({
        scheduledCheckInDate: z.coerce.date(),
        scheduledCheckOutDate: z.coerce.date(),
    })
}).refine((data) => data.dateRange.scheduledCheckInDate < data.dateRange.scheduledCheckOutDate, {
    path: ['dateRange'],
    message: 'Check out date must be after check in'
})


export const createWorkSessionSchema = z.object({
    scheduledCheckInDate: z.coerce.date(),
    scheduledCheckOutDate: z.coerce.date(),
}).refine((data) => data.scheduledCheckInDate && data.scheduledCheckOutDate, {
    path: [''],
    message: 'Scheduled check in, check out date are missing'
}).refine((data) => data.scheduledCheckInDate < data.scheduledCheckOutDate, {
    path: ['dateRange'],
    message: 'Check out date must be after check in'
})

export const editWorkSessionSchema = z.object({
    scheduledCheckInDate: z.coerce.date(),
    scheduledCheckOutDate: z.coerce.date(),
    checkInDate: z.coerce.date().optional(),
    checkOutDate: z.coerce.date().optional(),
}).refine((data) => data.scheduledCheckInDate && data.scheduledCheckOutDate, {
    path: [''],
    message: 'Scheduled check in, check out date are missing'
}).refine((data) => data.scheduledCheckInDate < data.scheduledCheckOutDate, {
    path: ['dateRange'],
    message: 'Check out date must be after check in'
});

