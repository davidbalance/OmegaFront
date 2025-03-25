import { z } from "zod";

const schema = z.object({
    corporativeName: z.string().nonempty()
});

export default schema;