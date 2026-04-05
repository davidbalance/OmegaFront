import { z } from "zod";

const schema = z.object({
    currentDisease: z.object({
        description: z.coerce.string().optional()
    }),
});

export type CurrentDiseaseSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<CurrentDiseaseSchemaType>): CurrentDiseaseSchemaType => ({
    currentDisease: {
        description: data?.currentDisease?.description ?? ""
    }
})

export default schema;