import { z } from "zod";

const employmentHistory = z.object({
    workplace: z.coerce.string().nonempty(),
    activities: z.coerce.string().nonempty(),
    lastWork: z.coerce.string().nonempty(),
    currentWork: z.coerce.string().nonempty(),
    duration: z.coerce.string().nonempty(),
    incident: z.coerce.string().optional(),
    accident: z.coerce.string().optional(),
    disease: z.coerce.string().optional(),
    qualified: z.boolean().default(false),
    date: z.date().optional(),
    specification: z.coerce.string().optional(),
    observations: z.coerce.string().optional()
}).
    refine(args => !!args.lastWork || !!args.currentWork, {
        message: "Debe introducir un valor",
        path: ["lastWork"]
    }).
    refine(args => !!args.lastWork || !!args.currentWork, {
        message: "Debe introducir un valor",
        path: ["currentWork"]
    }).
    refine(args => args.qualified ? !!args.date : true, {
        path: ["date"]
    }).
    refine(args => args.qualified ? !!args.specification : true, {
        path: ["specification"]
    })

const schema = z.object({
    employmentHistory: z.array(employmentHistory)
})

export type EmploymentHistorySchemaType = z.infer<typeof schema>

export const DEFAULT_JOB_HISTORY: z.infer<typeof employmentHistory> = {
    workplace: "",
    activities: "",
    lastWork: "",
    currentWork: "",
    duration: "",
    qualified: false,
    accident: "",
    date: new Date(),
    disease: "",
    incident: "",
    observations: "",
    specification: ""
}

export const adjustInitialValue = (data?: Partial<EmploymentHistorySchemaType>): EmploymentHistorySchemaType => ({
    employmentHistory: [DEFAULT_JOB_HISTORY],
    ...data
})

export default schema;