import { z } from "zod";

const JobRiskWithPreventionSchema = z.object({
    name: z.coerce.string().nonempty(),
    activity: z.coerce.string().nonempty(),
    preventiveMeasure: z.coerce.string().nonempty(),

    biologicalRiskVirus: z.coerce.boolean().default(false),
    biologicalRiskFungus: z.coerce.boolean().default(false),
    biologicalRiskBacteria: z.coerce.boolean().default(false),
    biologicalRiskParasites: z.coerce.boolean().default(false),
    biologicalRiskExposureToVectors: z.coerce.boolean().default(false),
    biologicalRiskExposureToWildlifeAnimals: z.coerce.boolean().default(false),
    biologicalRiskOther: z.coerce.string().optional(),
    ergonomicRiskManualHandlingLoads: z.coerce.boolean().default(false),
    ergonomicRiskRepetitiveMoves: z.coerce.boolean().default(false),
    ergonomicRiskForcedPostures: z.coerce.boolean().default(false),
    ergonomicRiskWorkWithPvd: z.coerce.boolean().default(false),
    ergonomicRiskOther: z.coerce.string().optional(),
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
    phychosocialRiskOther: z.coerce.string().optional(),
});

const schema = z.object({
    jobRiskWithPreventiveMeasure: z.array(JobRiskWithPreventionSchema)
})

export default schema;