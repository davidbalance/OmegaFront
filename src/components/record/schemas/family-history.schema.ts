import { z } from "zod";

const schema = z.object({
    familyHistoryCardioVascular: z.coerce.string().optional(),
    familyHistoryMetabolic: z.coerce.string().optional(),
    familyHistoryNeurologic: z.coerce.string().optional(),
    familyHistoryOncologic: z.coerce.string().optional(),
    familyHistoryInfectious: z.coerce.string().optional(),
    familyHistoryHereditary: z.coerce.string().optional(),
    familyHistoryDisability: z.coerce.string().optional(),
    familyHistoryOther: z.coerce.string().optional(),
});

export const adjustInitialValues = (data?: Partial<z.infer<typeof schema>>) => ({
    familyHistoryCardioVascular: data?.familyHistoryCardioVascular ?? '',
    familyHistoryMetabolic: data?.familyHistoryMetabolic ?? '',
    familyHistoryNeurologic: data?.familyHistoryNeurologic ?? '',
    familyHistoryOncologic: data?.familyHistoryOncologic ?? '',
    familyHistoryInfectious: data?.familyHistoryInfectious ?? '',
    familyHistoryHereditary: data?.familyHistoryHereditary ?? '',
    familyHistoryDisability: data?.familyHistoryDisability ?? '',
    familyHistoryOther: data?.familyHistoryOther ?? '',
});

export default schema;