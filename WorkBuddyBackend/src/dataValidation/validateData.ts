import { ZodObject } from "zod";
import { getZodErrorMessages } from "../util/data-validation/getZodErrorMessages";
import { ZodIssue } from "zod/v3";

export function validateData (data: any, schema: ZodObject) {
    const errorMessages: string[] = [];
    const isValid = schema.safeParse(data);
    
    if (!isValid.success) {
        getZodErrorMessages(errorMessages, isValid.error.issues as ZodIssue[]);
    }

    return { isValid: isValid.success, errorMessages }
}