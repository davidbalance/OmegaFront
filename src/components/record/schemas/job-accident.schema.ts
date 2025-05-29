import { z } from "zod";

const schema = z.object({
    jobAccidentHappened: z.coerce.boolean().default(false),
    jobAccidentDescription: z.coerce.string().optional(),
    jobAccidentDate: z.coerce.date().default(new Date()),
    jobAccidentObservation: z.coerce.string().optional(),
})
    .superRefine((data, ctx) => {
        if (data.jobAccidentHappened && !data.jobAccidentDescription) {
            ctx.addIssue({
                path: ['jobAccidentDescription'],
                code: z.ZodIssueCode.custom,
                message: "Debe colocar la descripcion del accidente"
            })
        }
        if (data.jobAccidentHappened && !data.jobAccidentDate) {
            ctx.addIssue({
                path: ['jobAccidentDate'],
                code: z.ZodIssueCode.custom,
                message: "Debe colocar la fecha del accidente"
            })
        }
    })

export const adjustInitialValue = (data?: Partial<z.infer<typeof schema>>) => ({
    jobAccidentHappened: data?.jobAccidentHappened ?? false,
    jobAccidentDate: data?.jobAccidentDate ?? new Date(),
    jobAccidentDescription: data?.jobAccidentDescription ?? '',
    jobAccidentObservation: data?.jobAccidentObservation ?? ''
});

export default schema;