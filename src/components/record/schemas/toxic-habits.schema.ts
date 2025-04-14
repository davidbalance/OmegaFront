import { z } from "zod";

const ToxicHabit = z.object({
    consumer: z.coerce.boolean().default(false),
    consumptionTime: z.coerce.number().optional(),
    quantity: z.coerce.number().optional(),
    consumed: z.coerce.boolean().default(false),
    timeOfAbstinence: z.coerce.number().optional(),
    other: z.coerce.string().default('').optional()
});

const schema = z.object({
    toxicHabitTobacco: ToxicHabit,
    toxicHabitAlcohol: ToxicHabit,
    toxicHabitOther: ToxicHabit
})

    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.quantity, { message: 'No se ha indicado el tiempo de consumo.', path: ['toxicHabitTobacco.consumptionTime'] })
    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.quantity, { message: 'No se ha indicado la cantidad.', path: ['toxicHabitTobacco.quantity'] })
    .refine(args => !args.toxicHabitTobacco.consumer ? true : !!args.toxicHabitTobacco.timeOfAbstinence, { message: 'No se ha indicado el tiempo de abstinencia.', path: ['toxicHabitTobacco.timeOfAbstinence'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.consumptionTime, { message: 'No se ha indicado el tiempo de consumo.', path: ['toxicHabitAlcohol.consumptionTime'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.quantity, { message: 'No se ha indicado la cantidad.', path: ['toxicHabitAlcohol.quantity'] })
    .refine(args => !args.toxicHabitAlcohol.consumer ? true : !!args.toxicHabitAlcohol.timeOfAbstinence, { message: 'No se ha indicado el tiempo de abstinencia.', path: ['toxicHabitAlcohol.timeOfAbstinence'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.consumptionTime, { message: 'No se ha indicado el tiempo de consumo.', path: ['toxicHabitOther.consumptionTime'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.other, { message: 'No se ha indicado otra sustancia.', path: ['toxicHabitOther.other'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.quantity, { message: 'No se ha indicado la cantidad.', path: ['toxicHabitOther.quantity'] })
    .refine(args => !args.toxicHabitOther.consumer ? true : !!args.toxicHabitOther.timeOfAbstinence, { message: 'No se ha indicado el tiempo de abstinencia.', path: ['toxicHabitOther.timeOfAbstinence'] })



export default schema;