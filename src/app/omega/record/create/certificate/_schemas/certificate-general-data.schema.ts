import { z } from "zod";

const schema = z.object({
    generalData: z.coerce.string().refine(arg => ['entry', 'periodic', 'reintegrate', 'retirement'].includes(arg)),

});

export default schema;