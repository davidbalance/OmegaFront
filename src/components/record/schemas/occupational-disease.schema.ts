import { z } from "zod";

const schema = z.object({
    occupationalDiseaseHappened: z.coerce.boolean().default(false),
    occupationalDiseaseDescription: z.coerce.string().optional(),
    occupationalDiseaseDate: z.coerce.date().default(new Date()),
    occupationalDiseaseObservation: z.coerce.string().optional(),
})
    .refine(args => !args.occupationalDiseaseHappened ? true : !!args.occupationalDiseaseDescription, { message: 'La descripcion tiene que llenarse', path: ['occupationalDiseaseDescription'] })
    .refine(args => !args.occupationalDiseaseHappened ? true : !!args.occupationalDiseaseDate, { message: 'Debe colocar una fecha', path: ['occupationalDiseaseDate'] })


export const adjustInitialValue = (data?: Partial<z.infer<typeof schema>>) => ({
    occupationalDiseaseHappened: data?.occupationalDiseaseHappened ?? false,
    occupationalDiseaseDescription: data?.occupationalDiseaseDescription ?? '',
    occupationalDiseaseDate: data?.occupationalDiseaseDate ?? new Date(),
    occupationalDiseaseObservation: data?.occupationalDiseaseObservation ?? ''
});

export default schema;