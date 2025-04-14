import { z } from "zod";

const schema = z.object({
    email: z.string().email().nonempty()
});

export default schema;