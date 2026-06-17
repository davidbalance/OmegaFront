import { z } from "zod";

export const SPECIAL_CONDITIONS_STATUS_YES = "yes"
export const SPECIAL_CONDITIONS_STATUS_NO = "no"
export const SPECIAL_CONDITIONS_STATUS_DO_NOT_ANSWER = "do-not-answer"
const specialConditionsStatus: string[] = [
    SPECIAL_CONDITIONS_STATUS_YES,
    SPECIAL_CONDITIONS_STATUS_NO,
    SPECIAL_CONDITIONS_STATUS_DO_NOT_ANSWER
];
const validateSpecialConditionsStatus = (arg: string) => specialConditionsStatus.includes(arg)
const specialConditionsSchema = z.object({
    allowsTransfusions: z.coerce.boolean().default(false),
    hormoneTherapyStatus: z.coerce.string().default(SPECIAL_CONDITIONS_STATUS_NO).refine(validateSpecialConditionsStatus),
    hormoneTherapyDetails: z.coerce.string().optional()
}).
    refine(args => {
        return args.hormoneTherapyStatus && args.hormoneTherapyStatus === SPECIAL_CONDITIONS_STATUS_YES && !!args.hormoneTherapyDetails;
    }, {
        message: "Debe indicar el tratamiento homonal",
        path: ["hormoneTherapyDetails"]
    });

export const FAMILY_PLANNING_STATUS_YES = "yes"
export const FAMILY_PLANNING_STATUS_NO = "no"
export const FAMILY_PLANNING_STATUS_DO_NOT_ANSWER = "do-not-answer"
const familyPlanningMethodStatus: string[] = [
    FAMILY_PLANNING_STATUS_YES,
    FAMILY_PLANNING_STATUS_NO,
    FAMILY_PLANNING_STATUS_DO_NOT_ANSWER
];
const validateFamilyPlanningMethodStatus = (arg: string) => familyPlanningMethodStatus.includes(arg)
const familyPlanningSchema = z.object({
    status: z.coerce.string().default(FAMILY_PLANNING_STATUS_NO).refine(validateFamilyPlanningMethodStatus),
    detail: z.coerce.string().optional()
}).
    refine(args => args.status == FAMILY_PLANNING_STATUS_YES ? !!args.detail : true, {
        message: "Debe indicar el metodo de planificacion familiar",
        path: ["detail"]
    });

const examSchema = z.object({
    exam: z.coerce.string().nonempty(),
    time: z.coerce.number().int().positive(),
    resultRecorded: z.coerce.string().optional()
});
export const DEFAULT_PERFORMED_EXAM: z.infer<typeof examSchema> = {
    exam: "",
    time: 0,
    resultRecorded: ""
}

const gynecologicalSchema = z.object({
    lastMenstruationDate: z.date(),
    pregnancies: z.coerce.number().int().refine(args => args >= 0),
    births: z.coerce.number().int().refine(args => args >= 0),
    cesareans: z.coerce.number().int().refine(args => args >= 0),
    abortions: z.coerce.number().int().refine(args => args >= 0),
})

export const SUBSTANCE_CONSUMER_CURRENT_USER = "CURRENT_USER";
export const SUBSTANCE_CONSUMER_FORMER_USER = "FORMER_USER";
export const SUBSTANCE_CONSUMER_NON_USER = "NON_USER";
const consumerStatus: string[] = [
    SUBSTANCE_CONSUMER_CURRENT_USER,
    SUBSTANCE_CONSUMER_FORMER_USER,
    SUBSTANCE_CONSUMER_NON_USER
];
const validateConsumerStatus = (arg: string) => consumerStatus.includes(arg)
const substanceConsumerSchema = z.object({
    name: z.coerce.string().default(""),
    status: z.coerce.string().refine(validateConsumerStatus),
    abstinenceDuration: z.coerce.string().optional(),
    substanceUseDuration: z.coerce.string().optional(),
}).
    refine(args => (args.status === SUBSTANCE_CONSUMER_FORMER_USER || args.status === SUBSTANCE_CONSUMER_CURRENT_USER) ? !!args.substanceUseDuration : true, {
        message: "Estos campos son necesarios",
        path: ["substanceUseDuration"]
    }).
    refine(args => args.status === SUBSTANCE_CONSUMER_FORMER_USER ? !!args.abstinenceDuration : true, {
        message: "Estos campos son necesarios",
        path: ["abstinenceDuration"]
    });
const toxicHabitSchema = z.object({
    tabacco: substanceConsumerSchema,
    alcohol: substanceConsumerSchema,
    other: substanceConsumerSchema,
})

const lifeStyleSchema = z.object({
    type: z.coerce.string().nonempty(),
    duration: z.coerce.string().nonempty()
})
export const DEFAULT_LIFE_STYLE: z.infer<typeof lifeStyleSchema> = {
    duration: "",
    type: ""
}

const preexistingConditionSchema = z.object({
    type: z.coerce.string().nonempty(),
    quantity: z.coerce.string().nonempty()
})
export const DEFAULT_PREEXISTING_CONDITION: z.infer<typeof preexistingConditionSchema> = {
    type: "",
    quantity: ""
}

const schema = z.object({
    personalHistory: z.object({
        clinicalAndSurgical: z.coerce.string().nonempty(),
        familyHistory: z.coerce.string().nonempty(),
        specialConditions: specialConditionsSchema,
        gynecological: gynecologicalSchema.optional(),
        familyPlanning: familyPlanningSchema,
        exams: z.array(examSchema).default([]),
        toxicHabits: toxicHabitSchema,
        lifeStyles: z.array(lifeStyleSchema).default([]),
        preexistingConditions: z.array(preexistingConditionSchema).default([]),
        observations: z.coerce.string().optional(),
    }),
});

export type PersonalHistorySchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<PersonalHistorySchemaType>): PersonalHistorySchemaType => ({
    personalHistory: {
        clinicalAndSurgical: data?.personalHistory?.clinicalAndSurgical ?? "APP:\nAPQ:\nAlergias:",
        familyHistory: data?.personalHistory?.familyHistory ?? "",
        gynecological: {
            lastMenstruationDate: data?.personalHistory?.gynecological?.lastMenstruationDate ?? new Date(),
            abortions: data?.personalHistory?.gynecological?.abortions ?? 0,
            births: data?.personalHistory?.gynecological?.births ?? 0,
            cesareans: data?.personalHistory?.gynecological?.cesareans ?? 0,
            pregnancies: data?.personalHistory?.gynecological?.pregnancies ?? 0
        },
        specialConditions: {
            allowsTransfusions: data?.personalHistory?.specialConditions?.allowsTransfusions ?? false,
            hormoneTherapyStatus: data?.personalHistory?.specialConditions?.hormoneTherapyStatus ?? SPECIAL_CONDITIONS_STATUS_NO,
            hormoneTherapyDetails: data?.personalHistory?.specialConditions?.hormoneTherapyDetails ?? ""
        },
        familyPlanning: {
            status: data?.personalHistory?.familyPlanning.status ?? FAMILY_PLANNING_STATUS_NO,
            detail: data?.personalHistory?.familyPlanning.detail ?? ""
        },
        exams: data?.personalHistory?.exams ?? [],
        toxicHabits: {
            tabacco: {
                status: data?.personalHistory?.toxicHabits?.tabacco.status ?? SUBSTANCE_CONSUMER_NON_USER,
                name: "tabacoo",
                abstinenceDuration: data?.personalHistory?.toxicHabits?.tabacco.abstinenceDuration ?? "",
                substanceUseDuration: data?.personalHistory?.toxicHabits?.tabacco.substanceUseDuration ?? "",
            },
            alcohol: {
                status: data?.personalHistory?.toxicHabits?.alcohol.status ?? SUBSTANCE_CONSUMER_NON_USER,
                name: "alcohol",
                abstinenceDuration: data?.personalHistory?.toxicHabits?.alcohol.abstinenceDuration ?? "",
                substanceUseDuration: data?.personalHistory?.toxicHabits?.alcohol.substanceUseDuration ?? "",
            },
            other: {
                status: data?.personalHistory?.toxicHabits?.other.status ?? SUBSTANCE_CONSUMER_NON_USER,
                name: data?.personalHistory?.toxicHabits?.other.name ?? "",
                abstinenceDuration: data?.personalHistory?.toxicHabits?.other.abstinenceDuration ?? "",
                substanceUseDuration: data?.personalHistory?.toxicHabits?.other.substanceUseDuration ?? "",
            },
        },
        lifeStyles: data?.personalHistory?.lifeStyles ?? [DEFAULT_LIFE_STYLE],
        preexistingConditions: data?.personalHistory?.preexistingConditions ?? [DEFAULT_PREEXISTING_CONDITION],
        observations: data?.personalHistory?.observations ?? "",
    }
})

export default schema;