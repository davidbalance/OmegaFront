import { z } from "zod";

const schema = z.object({
    medicalFitnessFit: z.coerce.boolean().default(false),
    medicalFitnessFitObservation: z.coerce.boolean().default(false),
    medicalFitnessFitLimitation: z.coerce.boolean().default(false),
    medicalFitnessNoFit: z.coerce.boolean().default(false),
    medicalFitnessObservation: z.coerce.string().default(''),
    medicalFitnessLimitation: z.coerce.string().default(''),
});

export default schema;