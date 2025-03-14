import { z } from "zod";

const schema = z.object({
    medicalFitnessType: z.coerce.string().default('fit').refine(arg => ['fit', 'fit-observation', 'fit-limitation', 'no-fit'].includes(arg), { message: 'No es un valor correcto' }),
    medicalFitnessObservation: z.coerce.string().default(''),
    medicalFitnessLimitation: z.coerce.string().default(''),
});

export default schema;