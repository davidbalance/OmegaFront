import { z } from "zod";

const schema = z.object({
    lifestylePhysicalActivity: z.coerce.boolean(),
    lifestylePhysicalActivityType: z.coerce.string().optional(),
    lifestylePhysicalActivityTimeQty: z.coerce.string().optional(),
    lifestyleMedication: z.coerce.boolean(),
    lifestyleMedicationName: z.array(z.coerce.string().nonempty()).default([]),
    lifestyleMedicationTimeQty: z.array(z.coerce.string().nonempty()).default([]),
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
    })

export const adjustInitialValue = (value?: Partial<z.infer<typeof schema>>) => ({
    lifestylePhysicalActivity: value?.lifestylePhysicalActivity ?? false,
    lifestylePhysicalActivityType: value?.lifestylePhysicalActivityType ?? '',
    lifestylePhysicalActivityTimeQty: value?.lifestylePhysicalActivityTimeQty ?? '',
    lifestyleMedication: value?.lifestyleMedication ?? false,
    lifestyleMedicationName: value?.lifestyleMedicationName ?? [],
    lifestyleMedicationTimeQty: value?.lifestyleMedicationTimeQty ?? [],
});

export default schema;