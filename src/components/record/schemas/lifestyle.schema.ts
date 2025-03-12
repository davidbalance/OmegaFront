import { z } from "zod";

const schema = z.object({
    lifestylePhysicalActivityActive: z.coerce.boolean(),
    lifestylePhysicalActivityType: z.coerce.string().optional(),
    lifestylePhysicalActivityDuration: z.coerce.number().optional(),
    lifestyleMedicationTaking: z.coerce.boolean(),
    lifestyleMedicationName: z.coerce.string().optional(),
    lifestyleMedicationQuantity: z.coerce.number().optional(),
})
    .refine(args => !args.lifestylePhysicalActivityActive ? true : !!args.lifestylePhysicalActivityType, { message: 'No se ha indicado la actividad fisica.', path: ['lifestylePhysicalActivityType'] })
    .refine(args => !args.lifestylePhysicalActivityActive ? true : !!args.lifestylePhysicalActivityDuration, { message: 'No se ha indicado la duracion.', path: ['lifestylePhysicalActivityDuration'] })
    .refine(args => !args.lifestyleMedicationTaking ? true : !!args.lifestyleMedicationName, { message: 'No se ha indicado la medicacion.', path: ['lifestyleMedicationName'] })
    .refine(args => !args.lifestyleMedicationTaking ? true : !!args.lifestyleMedicationQuantity, { message: 'No se ha indicado la cantidad.', path: ['lifestyleMedicationQuantity'] })

export default schema;