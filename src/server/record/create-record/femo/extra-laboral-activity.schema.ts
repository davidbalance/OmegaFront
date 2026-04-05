import { z } from "zod";

const extraActivitySchema = z.object({
    description: z.string().nonempty(),
    date: z.date()
})

const schema = z.object({
    extraLaboralActivities: z.array(extraActivitySchema)
});

export type ExtraLaboralActivitiesSchemaType = z.infer<typeof schema>

export const DEFAULT_JOB_ACTIVITY: z.infer<typeof extraActivitySchema> = {
    description: "",
    date: new Date()
}

export const adjustInitialValue = (data?: Partial<ExtraLaboralActivitiesSchemaType>): ExtraLaboralActivitiesSchemaType => ({
    extraLaboralActivities: [{
        date: new Date(),
        description: ""
    }],
    ...data
})

export default schema;