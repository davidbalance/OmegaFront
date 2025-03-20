import { z } from "zod";

const schema = z.object({
    patientRole: z.string().nonempty()
});

export default schema;