import InitialExamHistorySchema from './initial-exam-history-result.schema';
import { z } from "zod";

const schema = z.object({
    maleReproductiveExamProstateAntigen: InitialExamHistorySchema,
    maleReproductiveExamProstateEcho: InitialExamHistorySchema,
    maleReproductiveFamilyPlanningType: z.coerce.string(),
    maleReproductiveDeadChildren: z.coerce.number().default(0),
    maleReproductiveLivingChildren: z.coerce.number().default(0),
})

export const adjustInitialValues = (data?: Partial<z.infer<typeof schema>>) => ({
    maleReproductiveFamilyPlanningType: data?.maleReproductiveFamilyPlanningType || '',
    maleReproductiveExamProstateAntigen: data?.maleReproductiveExamProstateAntigen ?? { done: false, result: '', time: 0 },
    maleReproductiveExamProstateEcho: data?.maleReproductiveExamProstateEcho ?? { done: false, result: '', time: 0 },
    maleReproductiveDeadChildren: data?.maleReproductiveDeadChildren ?? 0,
    maleReproductiveLivingChildren: data?.maleReproductiveLivingChildren ?? 0
});

export default schema;