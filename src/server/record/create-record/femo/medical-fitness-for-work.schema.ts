import { z } from "zod";

export const MEDICAL_APTITUDE_FIT = 'fit'
export const MEDICAL_APTITUDE_FIT_OBSERVATION = 'fit-observation'
export const MEDICAL_APTITUDE_FIT_LIMITATION = 'fit-limitation'
export const MEDICAL_APTITUDE_NO_FIT = 'no-fit'

const fitnessType = [
    MEDICAL_APTITUDE_FIT,
    MEDICAL_APTITUDE_FIT_OBSERVATION,
    MEDICAL_APTITUDE_FIT_LIMITATION,
    MEDICAL_APTITUDE_NO_FIT,
]
const validateFitnessType = (arg: string) => fitnessType.includes(arg)
const schema = z.object({
    medicalAptitude: z.object({
        type: z.coerce.string().default(MEDICAL_APTITUDE_FIT).refine(validateFitnessType, { message: 'No es un valor correcto' }),
        observations: z.coerce.string().optional(),
    })
});

export type MedicalFitnessForWorkSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<MedicalFitnessForWorkSchemaType>): MedicalFitnessForWorkSchemaType => ({
    medicalAptitude: {
        type: data?.medicalAptitude?.type ?? MEDICAL_APTITUDE_FIT,
        observations: data?.medicalAptitude?.observations ?? ""
    }
})

export default schema;