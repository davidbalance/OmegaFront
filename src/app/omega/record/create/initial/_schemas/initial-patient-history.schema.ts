import { InitialRecordPayload } from "@/server/record/create-record/initial-record";
import { z } from "zod";


const ExamHistoryResultSchema = z.object({
    done: z.coerce.boolean().default(false),
    time: z.coerce.number().optional(),
    result: z.coerce.string().optional(),
});

const ToxicHabit = z.object({
    consumer: z.coerce.boolean().default(false),
    consumptionTime: z.coerce.number().optional(),
    quantity: z.coerce.number().optional(),
    consumed: z.coerce.boolean().optional(),
    timeOfAbstinence: z.coerce.number().optional(),
    other: z.coerce.string().default('').optional()
});

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
    gynecologicalExamPapanicolau: ExamHistoryResultSchema,
    gynecologicalExamColposcopy: ExamHistoryResultSchema,
    gynecologicalExamBreastEcho: ExamHistoryResultSchema,
    gynecologicalExamMammography: ExamHistoryResultSchema,
    maleReproductiveExamProstateAntigen: ExamHistoryResultSchema,
    maleReproductiveExamProstateEcho: ExamHistoryResultSchema,
    maleReproductiveFamilyPlanningType: z.coerce.string().optional(),
    toxicHabitTobacco: ToxicHabit,
    toxicHabitAlcohol: ToxicHabit,
    toxicHabitOther: ToxicHabit,
    lifestylePhysicalActivityActive: z.coerce.boolean(),
    lifestylePhysicalActivityType: z.coerce.string().optional(),
    lifestylePhysicalActivityDuration: z.coerce.number().optional(),
    lifestyleMedicationTaking: z.coerce.boolean(),
    lifestyleMedicationName: z.coerce.string().optional(),
    lifestyleMedicationQuantity: z.coerce.number().optional(),
})
    .refine(args => args.gynecologicalExamPapanicolau.done && !!args.gynecologicalExamPapanicolau.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamPapanicolau.result'] })
    .refine(args => args.gynecologicalExamPapanicolau.done && !!args.gynecologicalExamPapanicolau.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamPapanicolau.time'] })
    .refine(args => args.gynecologicalExamColposcopy.done && !!args.gynecologicalExamColposcopy.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamColposcopy.result'] })
    .refine(args => args.gynecologicalExamColposcopy.done && !!args.gynecologicalExamColposcopy.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamColposcopy.time'] })
    .refine(args => args.gynecologicalExamBreastEcho.done && !!args.gynecologicalExamBreastEcho.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamBreastEcho.result'] })
    .refine(args => args.gynecologicalExamBreastEcho.done && !!args.gynecologicalExamBreastEcho.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamBreastEcho.time'] })
    .refine(args => args.gynecologicalExamMammography.done && !!args.gynecologicalExamMammography.result, { message: 'Debe indicar el resultado', path: ['gynecologicalExamMammography.result'] })
    .refine(args => args.gynecologicalExamMammography.done && !!args.gynecologicalExamMammography.time, { message: 'Debe indicar el tiempo', path: ['gynecologicalExamMammography.time'] })
    .refine(args => args.maleReproductiveExamProstateAntigen.done && !!args.maleReproductiveExamProstateAntigen.result, { message: 'Debe indicar el resultado', path: ['maleReproductiveExamProstateAntigen.result'] })
    .refine(args => args.maleReproductiveExamProstateEcho.done && !!args.maleReproductiveExamProstateEcho.time, { message: 'Debe indicar el tiempo', path: ['maleReproductiveExamProstateEcho.time'] })

    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.quantity, { message: 'No se ha indicado el tiempo de consumo.', path: ['toxicHabitTobacco.consumptionTime'] })
    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.quantity, { message: 'No se ha indicado la cantidad.', path: ['toxicHabitTobacco.quantity'] })
    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.consumed, { message: 'No se ha indicado si es un exconsumidor.', path: ['toxicHabitTobacco.consumed'] })
    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.timeOfAbstinence, { message: 'No se ha indicado el tiempo de abstinencia.', path: ['toxicHabitTobacco.timeOfAbstinence'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.consumptionTime, { message: 'No se ha indicado el tiempo de consumo.', path: ['toxicHabitAlcohol.consumptionTime'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.quantity, { message: 'No se ha indicado la cantidad.', path: ['toxicHabitAlcohol.quantity'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.consumed, { message: 'No se ha indicado si es un exconsumidor.', path: ['toxicHabitAlcohol.consumed'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.timeOfAbstinence, { message: 'No se ha indicado el tiempo de abstinencia.', path: ['toxicHabitAlcohol.timeOfAbstinence'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.consumptionTime, { message: 'No se ha indicado el tiempo de consumo.', path: ['toxicHabitOther.consumptionTime'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.other, { message: 'No se ha indicado otra sustancia.', path: ['toxicHabitOther.other'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.quantity, { message: 'No se ha indicado la cantidad.', path: ['toxicHabitOther.quantity'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.consumed, { message: 'No se ha indicado si es un exconsumidor.', path: ['toxicHabitOther.consumed'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.timeOfAbstinence, { message: 'No se ha indicado el tiempo de abstinencia.', path: ['toxicHabitOther.timeOfAbstinence'] })

    .refine(args => !args.lifestylePhysicalActivityActive ? true : !!args.lifestylePhysicalActivityType, { message: 'No se ha indicado la actividad fisica.', path: ['lifestylePhysicalActivityType'] })
    .refine(args => !args.lifestylePhysicalActivityActive ? true : !!args.lifestylePhysicalActivityDuration, { message: 'No se ha indicado la duracion.', path: ['lifestylePhysicalActivityDuration'] })
    .refine(args => !args.lifestyleMedicationTaking ? true : !!args.lifestyleMedicationName, { message: 'No se ha indicado la medicacion.', path: ['lifestyleMedicationName'] })
    .refine(args => !args.lifestyleMedicationTaking ? true : !!args.lifestyleMedicationQuantity, { message: 'No se ha indicado la cantidad.', path: ['lifestyleMedicationQuantity'] })



export default schema;