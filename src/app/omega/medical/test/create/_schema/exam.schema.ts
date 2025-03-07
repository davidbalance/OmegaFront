import { z } from "zod";

const schema = z.object({
    examName: z.string().nonempty(),
    examSubtype: z.string().nonempty(),
    examType: z.string().nonempty(),
});

export default schema;