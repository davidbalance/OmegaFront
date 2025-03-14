import InitialExamHistorySchema from './initial-exam-history-result.schema';
import { z } from "zod";

const schema = z.object({
    maleReproductiveExamProstateAntigen: InitialExamHistorySchema,
    maleReproductiveExamProstateEcho: InitialExamHistorySchema,
    maleReproductiveFamilyPlanningType: z.coerce.string().optional(),
    maleReproductiveDeadChildren: z.coerce.number().default(0),
    maleReproductiveLivingChildren: z.coerce.number().default(0),
})
    .refine(args => !args.maleReproductiveExamProstateAntigen.done ? true : !!args.maleReproductiveExamProstateAntigen.result, { message: 'Debe indicar el resultado', path: ['maleReproductiveExamProstateAntigen.result'] })
    .refine(args => !args.maleReproductiveExamProstateEcho.done ? true : !!args.maleReproductiveExamProstateEcho.time, { message: 'Debe indicar el tiempo', path: ['maleReproductiveExamProstateEcho.time'] })

export default schema;