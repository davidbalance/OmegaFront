import { z } from "zod";

const schema = z.object({
    diseaseName: z.coerce.string().nonempty(),
});

export default schema;