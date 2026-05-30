import { z } from "zod";

const schema = z.object({
    patientName: z.coerce.string().nonempty(),
    patientLastname: z.coerce.string().nonempty(),
});

export default schema;