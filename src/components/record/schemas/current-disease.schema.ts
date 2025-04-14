import { z } from "zod";

const schema = z.object({
    currentDiseaseDescription: z.coerce.string().optional()
})

export default schema;