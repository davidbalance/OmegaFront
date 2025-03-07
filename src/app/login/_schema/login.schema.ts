import { z } from "zod";

const schema = z.object({
    email: z.coerce.string().email().nonempty(),
    password: z.coerce.string().nonempty()
});

export default schema;