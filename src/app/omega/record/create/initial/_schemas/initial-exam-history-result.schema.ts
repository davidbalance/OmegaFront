import { z } from "zod";

const schema = z.object({
    done: z.coerce.boolean().default(false),
    time: z.coerce.number().optional(),
    result: z.coerce.string().optional(),
});

export default schema;