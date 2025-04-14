import { z } from "zod";

const RetirementActivityAndRiskSchema = z.object({
    activity: z.coerce.string().nonempty(),
    risk: z.coerce.string().nonempty(),
});

const schema = z.object({
    institutionActivities: z.array(RetirementActivityAndRiskSchema)
})

export default schema;