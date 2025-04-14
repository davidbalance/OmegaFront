import { z } from "zod";

const schema = z.object({
    groupName: z.string().nonempty()
});

export default schema;