import { z } from "zod";

export const DIAGNOSIS_PRE_OPTION = 'pre';
export const DIAGNOSIS_DEF_OPTION = 'def';
const flagValues = [
    DIAGNOSIS_PRE_OPTION,
    DIAGNOSIS_DEF_OPTION
];
const validateFlag = (arg: string) => flagValues.includes(arg)

const diagnosisSchema = z.object({
    cie: z.string().nonempty(),
    description: z.string().nonempty(),
    diagnosis: z.coerce.string().refine(validateFlag, { message: 'No es un valor correcto' }),

})

export const DEFAULT_DIAGNOSIS: z.infer<typeof diagnosisSchema> = {
    cie: "",
    description: "",
    diagnosis: DIAGNOSIS_PRE_OPTION
}

const schema = z.object({
    diagnoses: z.array(diagnosisSchema)
});

export type DiagnosisSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<DiagnosisSchemaType>): DiagnosisSchemaType => ({
    diagnoses: [DEFAULT_DIAGNOSIS],
    ...data
})

export default schema;