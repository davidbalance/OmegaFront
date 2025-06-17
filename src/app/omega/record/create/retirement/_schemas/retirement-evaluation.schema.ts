import { z } from "zod";

const schema = z.object({
    retirementEvaluationDone: z.coerce.boolean().default(false),
    retirementEvaluationObservation: z.coerce.string().optional()
});

export default schema;