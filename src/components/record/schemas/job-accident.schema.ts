import { z } from "zod";

const schema = z.object({
    jobAccidentHappened: z.coerce.boolean().default(false),
    jobAccidentDescription: z.coerce.string().optional(),
    jobAccidentDate: z.coerce.date().optional(),
    jobAccidentObservation: z.coerce.string().optional(),
})
    .refine(args => !args.jobAccidentHappened ? true : !!args.jobAccidentDescription, { message: 'La descripcion tiene que llenarse' })
    .refine(args => !args.jobAccidentHappened ? true : !!args.jobAccidentDate, { message: 'Debe colocar una fecha' })

export default schema;