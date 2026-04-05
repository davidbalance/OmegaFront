import { z } from "zod";

export const GENERAL_DATA_EVALUATION_TYPE_ENTRY = 'entry';
export const GENERAL_DATA_EVALUATION_TYPE_PERIODIC = 'periodic';
export const GENERAL_DATA_EVALUATION_TYPE_RETURN = 'return';
export const GENERAL_DATA_EVALUATION_TYPE_RETIREMENT = 'retirement';
const generalData: string[] = [
    GENERAL_DATA_EVALUATION_TYPE_ENTRY,
    GENERAL_DATA_EVALUATION_TYPE_PERIODIC,
    GENERAL_DATA_EVALUATION_TYPE_RETURN,
    GENERAL_DATA_EVALUATION_TYPE_RETIREMENT
]
const validateGeneralData = (arg: string) => generalData.includes(arg)

const schema = z.object({
    generalDataEvaluation: z.coerce.string().refine(validateGeneralData),

});

export type GeneralDataSchemaType = z.infer<typeof schema>

export const adjustInitialValues = (data?: Partial<GeneralDataSchemaType>) => ({
    generalDataEvaluation: data?.generalDataEvaluation ?? "entry"
});

export default schema;