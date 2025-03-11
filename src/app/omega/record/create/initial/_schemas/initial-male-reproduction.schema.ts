import InitialExamHistorySchema from './initial-exam-history-result.schema';
import { z } from "zod";

const schema = z.object({
    maleReproductiveExamProstateAntigen: InitialExamHistorySchema,
    maleReproductiveExamProstateEcho: InitialExamHistorySchema,
    maleReproductiveFamilyPlanningType: z.coerce.string().optional(),
})
    .refine(args => args.maleReproductiveExamProstateAntigen.done && !!args.maleReproductiveExamProstateAntigen.result, { message: 'Debe indicar el resultado', path: ['maleReproductiveExamProstateAntigen.result'] })
    .refine(args => args.maleReproductiveExamProstateEcho.done && !!args.maleReproductiveExamProstateEcho.time, { message: 'Debe indicar el tiempo', path: ['maleReproductiveExamProstateEcho.time'] })

export default schema;