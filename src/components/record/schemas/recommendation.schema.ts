import { z } from "zod";

const schema = z.object({
    recommendationDescription: z.coerce.string().nonempty()
});

export default schema;