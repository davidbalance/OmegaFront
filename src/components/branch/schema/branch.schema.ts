import { z } from "zod";

const schema = z.object({
    branchName: z.string().nonempty()
});

export default schema;