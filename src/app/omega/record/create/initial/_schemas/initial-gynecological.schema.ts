import InitialExamHistorySchema from './initial-exam-history-result.schema';
import { z } from "zod";

const schema = z.object({
    gynecologicalMenarche: z.coerce.string().optional(),
    gynecologicalCycle: z.coerce.string().optional(),
    gynecologicalLastMenstruationDate: z.coerce.date().optional(),
    gynecologicalDeeds: z.coerce.string().optional(),
    gynecologicalBirths: z.coerce.string().optional(),
    gynecologicalCesarean: z.coerce.string().optional(),
    gynecologicalAbortions: z.coerce.string().optional(),
    gynecologicalDeadChildren: z.coerce.string().optional(),
    gynecologicalLivingChildren: z.coerce.string().optional(),
    gynecologicalSexualLife: z.coerce.string().optional(),
    gynecologicalFamilyPlanningType: z.coerce.string().optional(),
    gynecologicalExamPapanicolau: InitialExamHistorySchema,
    gynecologicalExamColposcopy: InitialExamHistorySchema,
    gynecologicalExamBreastEcho: InitialExamHistorySchema,
    gynecologicalExamMammography: InitialExamHistorySchema,
})
    .refine(args => !args.gynecologicalExamPapanicolau.done ? true : !!args.gynecologicalExamPapanicolau.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamPapanicolau.result'] })
    .refine(args => !args.gynecologicalExamPapanicolau.done ? true : !!args.gynecologicalExamPapanicolau.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamPapanicolau.time'] })
    .refine(args => !args.gynecologicalExamColposcopy.done ? true : !!args.gynecologicalExamColposcopy.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamColposcopy.result'] })
    .refine(args => !args.gynecologicalExamColposcopy.done ? true : !!args.gynecologicalExamColposcopy.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamColposcopy.time'] })
    .refine(args => !args.gynecologicalExamBreastEcho.done ? true : !!args.gynecologicalExamBreastEcho.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamBreastEcho.result'] })
    .refine(args => !args.gynecologicalExamBreastEcho.done ? true : !!args.gynecologicalExamBreastEcho.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamBreastEcho.time'] })
    .refine(args => !args.gynecologicalExamMammography.done ? true : !!args.gynecologicalExamMammography.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamMammography.result'] })
    .refine(args => !args.gynecologicalExamMammography.done ? true : !!args.gynecologicalExamMammography.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamMammography.time'] });

export default schema;