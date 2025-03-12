import { z } from "zod";

const schema = z.object({
    retirementDone: z.coerce.boolean().default(false),
    retirementObservation: z.coerce.string().optional()
})
    .refine(args => args.retirementDone ? true : !!args.retirementObservation, { message: 'Debe colocar una observacion', path: ['retirementObservation'] })

export default schema;