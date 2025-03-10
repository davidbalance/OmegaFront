import { InitialRecordPayload } from "@/server/record/create-record/initial-record";
import { z } from "zod";


type T = Pick<InitialRecordPayload, 'medicalAndSurgicalHistory' | 'gynecologicalMenarche' | 'gynecologicalCycle' | 'gynecologicalLastMenstruationDate'
    | 'gynecologicalDeeds' | 'gynecologicalBirths' | 'gynecologicalCesarean' | 'gynecologicalAbortions' | 'gynecologicalDeadChildren' | 'gynecologicalLivingChildren' | 'gynecologicalSexualLife' | 'gynecologicalFamilyPlanningType' | 'gynecologicalExam'
    | 'maleReproductiveExam' | 'maleReproductiveFamilyPlanningType'
    | 'toxicHabitTobacco' | 'toxicHabitAlcohol' | 'toxicHabitOther'
    | 'lifestylePhysicalActivityActive' | 'lifestylePhysicalActivityType' | 'lifestylePhysicalActivityDuration'
    | 'lifestyleMedicationTaking' | 'lifestyleMedicationName' | 'lifestyleMedicationQuantity' | 'lifestyleMedicationDuration'>;

const schema = z.object({
    medicalAndSurgicalHistory: z.coerce.string().nonempty(),
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
    gynecologicalExam: z.object({
        prostateAntigen: z.coerce.string().optional(),
        colposcopy: z.coerce.string().optional(),
        breastEcho: z.coerce.string().optional(),
        mammography: z.coerce.string().optional(),
    }).optional(),
    maleReproductiveExam: z.object({
        prostateAntigen: z.coerce.string().optional(),
        prostateEcho: z.coerce.string().optional(),
    }).optional(),
    maleReproductiveFamilyPlanningType: z.coerce.string().optional(),
    toxicHabitTobacco: z.object({
        consumed: z.coerce.boolean(),
        consumptionTime: z.coerce.number(),
        quantity: z.coerce.number(),
        consumer: z.coerce.boolean(),
        timeOfAbstinence: z.coerce.number()
    }).optional(),
    toxicHabitAlcohol: z.object({
        consumed: z.coerce.boolean(),
        consumptionTime: z.coerce.number(),
        quantity: z.coerce.number(),
        consumer: z.coerce.boolean(),
        timeOfAbstinence: z.coerce.number()
    }).optional(),
    toxicHabitOther: z.object({
        consumed: z.coerce.boolean(),
        consumptionTime: z.coerce.number(),
        quantity: z.coerce.number(),
        consumer: z.coerce.boolean(),
        timeOfAbstinence: z.coerce.number()
    }).optional(),
    lifestylePhysicalActivityActive: z.coerce.boolean(),
    lifestylePhysicalActivityType: z.coerce.string().optional(),
    lifestylePhysicalActivityDuration: z.coerce.number().optional(),
    lifestyleMedicationTaking: z.coerce.boolean(),
    lifestyleMedicationName: z.coerce.string().optional(),
    lifestyleMedicationQuantity: z.coerce.number().optional(),
    lifestyleMedicationDuration: z.coerce.number().optional(),
})

export default schema;