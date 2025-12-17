import { ZodIssue } from "zod/v3";

export function getZodErrorMessages (issues: ZodIssue[]) {
    const errors: string[] = [];
    issues.forEach(issue => errors.push(issue.message))
    return errors;
}