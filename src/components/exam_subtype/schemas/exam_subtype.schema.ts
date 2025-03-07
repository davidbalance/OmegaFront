import { z } from "zod";

const schema = z.object({
    subtypeName: z.string().nonempty()
});

export default schema;