import { z } from "zod";

const JobRiskWithPreventionSchema = z.object({
    name: z.coerce.string().nonempty(),
    activity: z.coerce.string().nonempty(),
    months: z.coerce.number().min(0),
    preventiveMeasure: z.coerce.string().nonempty(),

    psychosocialRiskMonotony: z.coerce.boolean().default(false),
    psychosocialRiskWorkOverload: z.coerce.boolean().default(false),
    psychosocialRiskThoroughnessOfTheTask: z.coerce.boolean().default(false),
    psychosocialRiskHighResponsibility: z.coerce.boolean().default(false),
    psychosocialRiskTakingResponsibilityAutonomy: z.coerce.boolean().default(false),
    psychosocialRiskSupervision: z.coerce.boolean().default(false),
    psychosocialRiskRoleConflict: z.coerce.boolean().default(false),
    psychosocialRiskNonFunctionClarify: z.coerce.boolean().default(false),
    psychosocialRiskBadWorkDistribution: z.coerce.boolean().default(false),
    psychosocialRiskRotativeShift: z.coerce.boolean().default(false),
    psychosocialRiskIntrapersonalRelations: z.coerce.boolean().default(false),
    psychosocialRiskJobInstability: z.coerce.boolean().default(false),
    psychosocialRiskOther: z.coerce.string().optional(),
});

const schema = z.object({
    jobRiskWithPreventiveMeasure: z.array(JobRiskWithPreventionSchema)
})

export default schema;