import { z } from "zod";

const schema = z.object({
    generalDataEntry: z.coerce.boolean().default(false),
    generalDataPeriodic: z.coerce.boolean().default(false),
    generalDataReintegrate: z.coerce.boolean().default(false),
    generalDataRetirement: z.coerce.boolean().default(false),
});

export default schema;