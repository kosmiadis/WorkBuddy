import { ZodObject } from "zod";

export function validateData (data: any, schema: ZodObject) {
    const errorMessages: string[] = [];
    const isValid = schema.safeParse(data);
    if (!isValid.success) {
        isValid.error.issues.forEach(issue => {
            errorMessages.push(issue.message)
            console.log(issue);
    });
    }

    return { isValid: isValid.success, errorMessages }
}