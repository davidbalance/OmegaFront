import { z } from "zod";

const schema = z.object({
    dni: z.coerce.string().nonempty(),
    email: z.coerce.string().email(),
    lastname: z.coerce.string().nonempty(),
    name: z.coerce.string().nonempty()
});

export default schema;