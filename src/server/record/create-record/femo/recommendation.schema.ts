import { z } from "zod";

const schema = z.object({
    recommendation: z.object({
        description: z.coerce.string().optional(),
    })
});

export type RecommendationSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<RecommendationSchemaType>): RecommendationSchemaType => ({
    recommendation: {
        description: data?.recommendation?.description ?? ""
    }
})

export default schema;