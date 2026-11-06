import { z } from "zod";

const DEFAULT_HEALTH_FACILITY_NAME = "Omega Salud Ocupacional."

const establishmentSchema = z.object({
    institutionName: z.coerce.string(),
    ruc: z.coerce.string().length(13),
    ciiu: z.coerce.string().optional(),
    healthFacility: z.coerce.string().default(DEFAULT_HEALTH_FACILITY_NAME)
})

const patientGender: string[] = ["male", "female"]
const validatePatientGender = (arg: string) => patientGender.includes(arg)

const patientSchema = z.object({
    firstName: z.coerce.string().nonempty(),
    middleName: z.coerce.string().nonempty(),
    lastName: z.coerce.string().nonempty(),
    secondLastName: z.coerce.string().nonempty(),
    gender: z.coerce.string().refine(validatePatientGender, { message: 'Solo puede escoger entre Hombre o Mujer' }),
    jobPosition: z.coerce.string().nonempty()
})

const schema = z.object({
    establishment: establishmentSchema,
    patient: patientSchema
});

export type InstitutionSchemaType = z.infer<typeof schema>

export const adjustInitialValues = (data?: Partial<InstitutionSchemaType>) => ({
    establishment: {
        institutionName: data?.establishment?.institutionName ?? "",
        ruc: data?.establishment?.ruc ?? "",
        healthFacility: data?.establishment?.healthFacility ?? DEFAULT_HEALTH_FACILITY_NAME,
        ciiu: data?.establishment?.ciiu ?? ""
    },
    patient: {
        firstName: data?.patient?.firstName ?? "",
        middleName: data?.patient?.middleName ?? "",
        lastName: data?.patient?.lastName ?? "",
        secondLastName: data?.patient?.secondLastName ?? "",
        gender: data?.patient?.gender ?? "",
        jobPosition: data?.patient?.jobPosition ?? "",
    }
});

export default schema;