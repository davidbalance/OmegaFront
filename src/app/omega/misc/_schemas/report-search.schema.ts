import { z } from "zod";

const schema = z.object({
    corporative: z.coerce.string().optional(),
    ruc: z.coerce.string().optional(),
    year: z.coerce.number().optional()
});

export default schema;