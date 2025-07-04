import { z } from "zod";

const schema = z.object({
    examName: z.string().nonempty()
});

export default schema;