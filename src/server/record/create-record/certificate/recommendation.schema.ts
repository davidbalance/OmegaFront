import { z } from "zod";

const schema = z.object({
    recommendation: z.object({
        observation: z.coerce.string().nonempty(),
    })
});

export type RecommendationSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<RecommendationSchemaType>): RecommendationSchemaType => ({
    recommendation: {
        observation: data?.recommendation?.observation ?? ""
    }
})

export default schema;