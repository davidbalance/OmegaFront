import { z } from "zod";

const DEFAULT_HEALTH_FACILITY_NAME = "Omega Salud Ocupacional."

export const PRIORITY_GROUP_PREGNANT = "pregnant"
export const PRIORITY_GROUP_DISABILITY = "disability"
export const PRIORITY_GROUP_CATASTROFIC_ILLNESS = "catastrofic-illness"
export const PRIORITY_GROUP_ELDERLY = "elderly"
const priorityGroup: string[] = [
    PRIORITY_GROUP_PREGNANT,
    PRIORITY_GROUP_DISABILITY,
    PRIORITY_GROUP_CATASTROFIC_ILLNESS,
    PRIORITY_GROUP_ELDERLY,
];
const validatePriorityGroup = (arg: string[]) => arg.length ? arg.every(e => priorityGroup.includes(e)) : true

export const PATIENT_LATERALITY_RIGHT = "right"
export const PATIENT_LATERALITY_LEFT = "left"
const patientLaterality: string[] = [
    PATIENT_LATERALITY_RIGHT,
    PATIENT_LATERALITY_LEFT
]
const validatePatientLaterality = (arg: string) => patientLaterality.includes(arg);

export const PATIENT_GENDER_MALE = "male"
export const PATIENT_GENDER_FEMALE = "female"
const patientGender: string[] = [
    PATIENT_GENDER_MALE,
    PATIENT_GENDER_FEMALE
]
const validatePatientGender = (arg: string) => patientGender.includes(arg)

export const PATIENT_BLOOD_GROUP_ARh_PLUS = 'ARh+'
export const PATIENT_BLOOD_GROUP_ARh_MINUS = 'ARh-'
export const PATIENT_BLOOD_GROUP_BRh_PLUS = 'BRh+'
export const PATIENT_BLOOD_GROUP_BRh_MINUS = 'BRh-'
export const PATIENT_BLOOD_GROUP_ORh_PLUS = 'ORh+'
export const PATIENT_BLOOD_GROUP_ORh_MINUS = 'ORh-'
export const PATIENT_BLOOD_GROUP_ABRh_PLUS = 'ABRh+'
export const PATIENT_BLOOD_GROUP_ABRh_MINUS = 'ABRh-'
const patientBloodGroup: string[] = [
    PATIENT_BLOOD_GROUP_ARh_PLUS,
    PATIENT_BLOOD_GROUP_ARh_MINUS,
    PATIENT_BLOOD_GROUP_BRh_PLUS,
    PATIENT_BLOOD_GROUP_BRh_MINUS,
    PATIENT_BLOOD_GROUP_ORh_PLUS,
    PATIENT_BLOOD_GROUP_ORh_MINUS,
    PATIENT_BLOOD_GROUP_ABRh_PLUS,
    PATIENT_BLOOD_GROUP_ABRh_MINUS,
]
const validatePatientBloodGroup = (arg: string) => patientBloodGroup.includes(arg)

const establishmentSchema = z.object({
    institutionName: z.coerce.string().default(""),
    ruc: z.coerce.string().length(13),
    ciiu: z.coerce.string().optional(),
    healthFacility: z.coerce.string()
})

const patientSchema = z.object({
    firstName: z.coerce.string().nonempty(),
    middleName: z.coerce.string().default(""),
    lastName: z.coerce.string().nonempty(),
    secondLastName: z.coerce.string().default(""),
    gender: z.coerce.string().refine(validatePatientGender, { message: 'Solo puede escoger entre Hombre o Mujer' }),
    priorityGroup: z.array(z.string().nonempty()).default([]).refine(validatePriorityGroup),
    birthDate: z.coerce.date(),
    laterality: z.coerce.string().refine(validatePatientLaterality),
    bloodGroup: z.coerce.string().refine(validatePatientBloodGroup)
})

const schema = z.object({
    establishment: establishmentSchema,
    patient: patientSchema
});

export type InstitutionSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<InstitutionSchemaType>): InstitutionSchemaType => ({
    establishment: {
        institutionName: "",
        ruc: data?.establishment?.ruc ?? "",
        healthFacility: data?.establishment?.healthFacility ?? "",
        ciiu: data?.establishment?.ciiu ?? ""
    },
    patient: {
        firstName: data?.patient?.firstName ?? "",
        middleName: data?.patient?.middleName ?? "",
        lastName: data?.patient?.lastName ?? "",
        secondLastName: data?.patient?.secondLastName ?? "",
        gender: data?.patient?.gender ?? "",
        priorityGroup: data?.patient?.priorityGroup ?? [],
        birthDate: data?.patient?.birthDate ?? new Date(),
        laterality: data?.patient?.laterality ?? PATIENT_LATERALITY_RIGHT,
        bloodGroup: data?.patient?.bloodGroup ?? PATIENT_BLOOD_GROUP_ARh_PLUS
    }
})

export default schema;