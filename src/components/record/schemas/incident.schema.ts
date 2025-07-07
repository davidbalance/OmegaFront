import { z } from "zod";

const schema = z.object({
    incidentDescription: z.coerce.string().optional()
});

export default schema;