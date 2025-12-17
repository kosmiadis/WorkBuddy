import z from "zod";

export const addHourlyRateSchema = z.object({
    hourlyRate: z.string()
})