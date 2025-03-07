import { z } from "zod";

const schema = z.object({
    areaName: z.string().nonempty()
});

export default schema;