import { z } from "zod";

const schema = z.object({
    medicalFitnessType: z.coerce.string().default('fit').refine(arg => ['fit', 'fit-observation', 'fit-limitation', 'no-fit'].includes(arg), { message: 'No es un valor correcto' }),
    medicalFitnessObservation: z.coerce.string().optional(),
    medicalFitnessLimitation: z.coerce.string().optional(),
    medicalFitnessReubication: z.coerce.string().optional(),
})
    .superRefine((data, ctx) => {
        if (data.medicalFitnessType === 'fit-observation' && !data.medicalFitnessObservation) {
            ctx.addIssue({
                path: ['medicalFitnessObservation'],
                code: z.ZodIssueCode.custom,
                message: 'Debe ingresar una observacion'
            })
        }
        
        if (data.medicalFitnessType === 'fit-limitation' && !data.medicalFitnessLimitation) {
            ctx.addIssue({
                path: ['medicalFitnessLimitation'],
                code: z.ZodIssueCode.custom,
                message: 'Debe ingresar una limitacion'
            })
        }
    });

export const adjustInitialValues = (data?: Partial<z.infer<typeof schema>>) => ({
    medicalFitnessType: data?.medicalFitnessType ?? 'fit',
    medicalFitnessLimitation: data?.medicalFitnessLimitation ?? '',
    medicalFitnessObservation: data?.medicalFitnessObservation ?? '',
    medicalFitnessReubication: data?.medicalFitnessReubication ?? '',
})

export default schema;