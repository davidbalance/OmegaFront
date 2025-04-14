import { z } from "zod";

const schema = z.object({
    managementName: z.string().nonempty()
});

export default schema;