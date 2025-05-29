import InitialExamHistorySchema from './initial-exam-history-result.schema';
import { z } from "zod";

const schema = z.object({
    gynecologicalMenarche: z.coerce.string().nonempty(),
    gynecologicalCycle: z.coerce.string().nonempty(),
    gynecologicalLastMenstruationDate: z.coerce.date(),
    gynecologicalDeeds: z.coerce.number(),
    gynecologicalBirths: z.coerce.number(),
    gynecologicalCesarean: z.coerce.number(),
    gynecologicalAbortions: z.coerce.number(),
    gynecologicalDeadChildren: z.coerce.number(),
    gynecologicalLivingChildren: z.coerce.number(),
    gynecologicalSexualLife: z.coerce.boolean().default(false),
    gynecologicalFamilyPlanningType: z.coerce.string(),
    gynecologicalExamPapanicolau: InitialExamHistorySchema,
    gynecologicalExamColposcopy: InitialExamHistorySchema,
    gynecologicalExamBreastEcho: InitialExamHistorySchema,
    gynecologicalExamMammography: InitialExamHistorySchema,
})
export default schema;