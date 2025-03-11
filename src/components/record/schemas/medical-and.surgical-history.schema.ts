import { z } from "zod";

const schema = z.object({
    medicalAndSurgicalHistory: z.coerce.string().optional(),
});

export default schema;