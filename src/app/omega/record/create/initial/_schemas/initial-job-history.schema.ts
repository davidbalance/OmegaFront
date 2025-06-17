import { z } from "zod";

const JobHistorySchema = z.object({
    jobHistoryCompany: z.coerce.string().nonempty(),
    jobHistoryPosition: z.coerce.string().nonempty(),
    jobHistoryActivity: z.coerce.string().nonempty(),
    jobHistoryTime: z.coerce.number().min(0),
    jobHistoryRiskPhysical: z.coerce.boolean().default(false),
    jobHistoryRiskMechanical: z.coerce.boolean().default(false),
    jobHistoryRiskChemical: z.coerce.boolean().default(false),
    jobHistoryRiskBiological: z.coerce.boolean().default(false),
    jobHistoryRiskErgonomic: z.coerce.boolean().default(false),
    jobHistoryRiskPsychosocial: z.coerce.boolean().default(false),
    jobHistoryObservation: z.coerce.string().default(''),
});

const schema = z.object({
    jobHistory: z.array(JobHistorySchema)
})

export default schema;