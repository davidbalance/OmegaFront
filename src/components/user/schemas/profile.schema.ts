import { z } from "zod";

const schema = z.object({
    dni: z.coerce.string().nonempty(),
    email: z.coerce.string().nonempty().regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format"
    ),
    lastname: z.coerce.string().nonempty(),
    name: z.coerce.string().nonempty()
});

export default schema;