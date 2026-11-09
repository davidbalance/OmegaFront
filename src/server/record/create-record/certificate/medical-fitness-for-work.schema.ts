import { z } from "zod";

export const FITNESS_TYPE_FIT = 'fit'
export const FITNESS_TYPE_FIT_OBSERVATION = 'fit-observation'
export const FITNESS_TYPE_FIT_LIMITATION = 'fit-limitation'
export const FITNESS_TYPE_FIT_NO_FIT = 'no-fit'
const fitnessType = [
    FITNESS_TYPE_FIT,
    FITNESS_TYPE_FIT_OBSERVATION,
    FITNESS_TYPE_FIT_LIMITATION,
    FITNESS_TYPE_FIT_NO_FIT,
]
const validateFitnessType = (arg: string) => fitnessType.includes(arg)
const schema = z.object({
    fitness: z.object({
        type: z.coerce.string().default('fit').refine(validateFitnessType, { message: 'No es un valor correcto' }),
        observation: z.coerce.string().optional(),
    })
});

export type MedicalFitnessForWorkSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<MedicalFitnessForWorkSchemaType>): MedicalFitnessForWorkSchemaType => ({
    fitness: {
        type: data?.fitness?.type ?? FITNESS_TYPE_FIT,
        observation: data?.fitness?.observation ?? ""
    }
})

export default schema;