import { z } from "zod";

const extraActivitySchema = z.object({
    description: z.string().nonempty(),
    date: z.date()
})

const schema = z.object({
    extraLaboralActivities: z.array(extraActivitySchema)
});

export type ExtraLaboralActivitiesSchemaType = z.infer<typeof schema>

export const DEFAULT_EXTRA_LABORAL_ACTIVITY: z.infer<typeof extraActivitySchema> = {
    description: "",
    date: new Date()
}

export const adjustInitialValue = (data?: Partial<ExtraLaboralActivitiesSchemaType>): ExtraLaboralActivitiesSchemaType => ({
    extraLaboralActivities: data?.extraLaboralActivities && data.extraLaboralActivities.length > 0 ? data.extraLaboralActivities : [DEFAULT_EXTRA_LABORAL_ACTIVITY],
})

export default schema;