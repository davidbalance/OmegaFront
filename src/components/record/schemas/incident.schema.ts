import { z } from "zod";

const schema = z.object({
    incidentDescription: z.coerce.string().nonempty()
});

export default schema;