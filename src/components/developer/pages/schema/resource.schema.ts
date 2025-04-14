import { z } from "zod";

const schema = z.object({
    order: z.coerce.number().min(0).optional().default(0),
    label: z.coerce.string().nonempty(),
    address: z.coerce.string().nonempty(),
    icon: z.coerce.string().nonempty(),
});

export default schema;