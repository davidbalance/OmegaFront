import { z } from "zod";

const ToxicHabit = z.object({
    haveConsume: z.coerce.boolean().default(false),
    name: z.coerce.string().optional(),
    consumptionTime: z.coerce.number().optional(),
    quantity: z.coerce.string().optional(),
    isExConsumer: z.coerce.boolean().default(false),
    timeOfAbstinence: z.coerce.string().optional(),
})
    .superRefine((data, ctx) => {
        if (data.haveConsume) {
            if (!data.name) {
                ctx.addIssue({
                    path: ['name'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar un habito toxico"
                })
            }

            if (!data.consumptionTime) {
                ctx.addIssue({
                    path: ['consumptionTime'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar el tiempo de consumo"
                })
            } else if (data.consumptionTime <= 0) {
                ctx.addIssue({
                    path: ['consumptionTime'],
                    code: z.ZodIssueCode.custom,
                    message: "El tiempo de consumo es mayor a 0"
                })
            }

            if (!data.quantity) {
                ctx.addIssue({
                    path: ['quantity'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar la cantidad que ha consumido"
                })
            }

            if (data.isExConsumer && !data.timeOfAbstinence) {
                ctx.addIssue({
                    path: ['timeOfAbstinence'],
                    code: z.ZodIssueCode.custom,
                    message: "Debe agregar el tiempo de abstinencia"
                })
            }
        }
    });

const schema = z.object({
    toxicHabitTobacco: ToxicHabit,
    toxicHabitAlcohol: ToxicHabit,
    toxicHabitOther: ToxicHabit
});


export const adjustInitialValue = (data?: Partial<z.infer<typeof ToxicHabit>>) => ({
    haveConsume: data?.haveConsume ?? false,
    name: data?.name ?? '',
    consumptionTime: data?.consumptionTime ?? 0,
    quantity: data?.quantity ?? '',
    isExConsumer: data?.isExConsumer ?? false,
    timeOfAbstinence: data?.timeOfAbstinence ?? ''

});


export default schema;