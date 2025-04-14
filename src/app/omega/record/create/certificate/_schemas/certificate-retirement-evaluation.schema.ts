import { z } from "zod";

const schema = z.object({
    retirementEvaluationDone: z.coerce.boolean().default(false),
    retirementEvaluationCondition: z.coerce.string().refine(arg => ['presuntive', 'definitive', 'no-apply'].includes(arg)),
    retirementEvaluationConditionWithJob: z.coerce.string().refine(arg => ['yes', 'no', 'no-apply'].includes(arg)),
});

export default schema;