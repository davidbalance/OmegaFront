import { z } from "zod";

const schema = z.object({
    patientDni: z.coerce.string().min(10).max(10)
});

export default schema;