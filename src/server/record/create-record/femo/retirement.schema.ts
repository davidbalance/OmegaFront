import { z } from "zod";

export const RETIREMENT_YES_OPTION = "yes"
export const RETIREMENT_NO_OPTION = "no"
const flagValues = [
    RETIREMENT_YES_OPTION,
    RETIREMENT_NO_OPTION
];
const validateFlag = (arg: string) => flagValues.includes(arg)

const schema = z.object({
    retirementEvaluation: z.object({
        performed: z.coerce.string().refine(validateFlag, { message: 'No es un valor correcto' }),
        workRelated: z.coerce.string().refine(validateFlag, { message: 'No es un valor correcto' }),
        observation: z.coerce.string().optional(),
    })
});

export type RetirementSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<RetirementSchemaType>): RetirementSchemaType => ({
    retirementEvaluation: {
        performed: data?.retirementEvaluation?.performed ?? RETIREMENT_NO_OPTION,
        workRelated: data?.retirementEvaluation?.workRelated ?? RETIREMENT_NO_OPTION,
        observation: data?.retirementEvaluation?.observation ?? "",
    }
})

export default schema;