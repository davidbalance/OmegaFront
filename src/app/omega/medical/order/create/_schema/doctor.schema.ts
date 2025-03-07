import { z } from "zod";

const schema = z.object({
    doctorDni: z.string().nonempty(),
    doctorFullname: z.string().nonempty(),
});

export default schema;