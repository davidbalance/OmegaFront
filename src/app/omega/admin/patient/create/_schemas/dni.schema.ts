import { z } from "zod";

const schema = z.object({
    patientDni: z.coerce.string().min(9).max(10)
});

export default schema;