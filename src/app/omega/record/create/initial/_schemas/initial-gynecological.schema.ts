import InitialExamHistorySchema from './initial-exam-history-result.schema';
import { z } from "zod";

const schema = z.object({
    gynecologicalMenarche: z.coerce.string().optional(),
    gynecologicalCycle: z.coerce.string().optional(),
    gynecologicalLastMenstruationDate: z.coerce.date().optional(),
    gynecologicalDeeds: z.coerce.number().optional(),
    gynecologicalBirths: z.coerce.number().optional(),
    gynecologicalCesarean: z.coerce.number().optional(),
    gynecologicalAbortions: z.coerce.number().optional(),
    gynecologicalDeadChildren: z.coerce.number().optional(),
    gynecologicalLivingChildren: z.coerce.number().optional(),
    gynecologicalSexualLife: z.coerce.boolean().default(false),
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