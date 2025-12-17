import z from "zod";

export const workSessionSchema = z.object({
    dateRange: z.object({
        scheduledCheckInDate: z.coerce.date(),
        scheduledCheckOutDate: z.coerce.date(),
        checkInDate: z.coerce.date().optional(),
        checkOutDate: z.coerce.date().optional(),
    })
}).refine((data) => data.dateRange.scheduledCheckInDate < data.dateRange.scheduledCheckOutDate, {
    path: ['dateRange'],
    message: 'Check out date must be after check in'
}).refine((data) => {
    if (data.dateRange.checkInDate && data.dateRange.checkOutDate) {
        if (data.dateRange.checkInDate >= data.dateRange.checkOutDate) {
            return false
        }
    }
    return true
}, {
    path: ['dateRange'],
    message: 'Check in time must be before check out'
})
