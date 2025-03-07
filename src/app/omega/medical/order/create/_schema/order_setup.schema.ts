import { z } from "zod";

const schema = z.object({
    branchName: z.coerce.string().nonempty(),
    companyName: z.coerce.string().nonempty(),
    companyRuc: z.coerce.string().nonempty(),
    corporativeName: z.coerce.string().nonempty(),
    process: z.coerce.string().nonempty(),
});

export default schema;