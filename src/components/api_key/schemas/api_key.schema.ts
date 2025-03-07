import { z } from "zod";

const schema = z.object({
    apikey: z.string().nonempty()
});

export default schema;