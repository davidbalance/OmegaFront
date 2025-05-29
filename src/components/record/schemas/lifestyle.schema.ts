import { z } from "zod";

const schema = z.object({
    lifestylePhysicalActivity: z.coerce.boolean(),
    lifestylePhysicalActivityType: z.coerce.string().optional(),
    lifestylePhysicalActivityTimeQty: z.coerce.string().optional(),
    lifestyleMedication: z.coerce.boolean(),
    lifestyleMedicationName: z.coerce.string().optional(),
    lifestyleMedicationTimeQty: z.coerce.string().optional(),
})
    .superRefine((data, ctx) => {
        if (data.lifestylePhysicalActivity) {
            if (!data.lifestylePhysicalActivityType) {
                ctx.addIssue({
                    path: ['lifestylePhysicalActivityType'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar el nombre de la actividad."
                });
            }
            if (!data.lifestylePhysicalActivityTimeQty) {
                ctx.addIssue({
                    path: ['lifestylePhysicalActivityTimeQty'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar el tiempo/cantidad de la actividad."
                });
            }
        }

        if (data.lifestyleMedication) {
            if (!data.lifestyleMedicationName) {
                ctx.addIssue({
                    path: ['lifestyleMedicationName'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar el nombre del medicamento."
                });
            }
            if (!data.lifestyleMedicationTimeQty) {
                ctx.addIssue({
                    path: ['lifestyleMedicationTimeQty'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar el tiempo/cantidad del medicamento."
                });
            }
        }
    })

export const adjustInitialValue = (value?: Partial<z.infer<typeof schema>>) => ({
    lifestylePhysicalActivity: value?.lifestylePhysicalActivity ?? false,
    lifestylePhysicalActivityType: value?.lifestylePhysicalActivityType ?? '',
    lifestylePhysicalActivityTimeQty: value?.lifestylePhysicalActivityTimeQty ?? '',
    lifestyleMedication: value?.lifestyleMedication ?? false,
    lifestyleMedicationName: value?.lifestyleMedicationName ?? '',
    lifestyleMedicationTimeQty: value?.lifestyleMedicationTimeQty ?? '',
});

export default schema;