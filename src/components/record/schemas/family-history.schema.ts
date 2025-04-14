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

export default schema;