import { z } from "zod";

const schema = z.object({
    done: z.coerce.boolean().default(false),
    time: z.coerce.number().optional(),
    result: z.coerce.string().optional(),
}).superRefine((data, ctx) => {
    if (data.done && !data.result) {
        ctx.addIssue({
            path: ['result'],
            code: z.ZodIssueCode.custom,
            message: "El resultado se requiere."
        });
    }
    if (data.done && !data.time) {
        ctx.addIssue({
            path: ['time'],
            code: z.ZodIssueCode.custom,
            message: "El tiempo se requiere."
        });
    }
});

export default schema;