import { z } from "zod";

const schema = z.object({
    process: z.coerce.string().nonempty(),
});

export default schema;