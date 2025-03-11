import { z } from "zod";

const schema = z.object({
    extraActivityDescription: z.coerce.string().optional()
})

export default schema;