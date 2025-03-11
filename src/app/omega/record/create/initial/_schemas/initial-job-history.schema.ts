import { z } from "zod";

const JobHistorySchema = z.object({
    lastJobCompany: z.coerce.string().nonempty(),
    lastJobPosition: z.coerce.string().nonempty(),
    lastJobActivity: z.coerce.string().nonempty(),
    lastJobTime: z.coerce.number().min(0),
    lastJobRiskPhysical: z.coerce.boolean().default(false),
    lastJobRiskMechanical: z.coerce.boolean().default(false),
    lastJobRiskChemical: z.coerce.boolean().default(false),
    lastJobRiskBiological: z.coerce.boolean().default(false),
    lastJobRiskErgonomic: z.coerce.boolean().default(false),
    lastJobRiskPsychosocial: z.coerce.boolean().default(false),
    lastJobObservation: z.coerce.string().nonempty(),
});

const schema = z.object({
    jobHistory: z.array(JobHistorySchema)
})

export default schema;