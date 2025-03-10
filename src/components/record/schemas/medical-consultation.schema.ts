import { z } from "zod";

const schema = z.object({
    medicalConsultationDescription: z.coerce.string().nonempty()
});

export default schema;