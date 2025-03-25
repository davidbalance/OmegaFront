import { z } from "zod";

const schema = z.object({
    companyName: z.string().nonempty(),
    companyRuc: z.string().nonempty().length(13).refine(arg => arg.match(/^[0-9]*$/), {
        message: 'Ruc no valido'
    }),
    companyAddress: z.string().nonempty(),
    companyPhone: z.string().nonempty().refine(arg => arg.match(/^[0-9]*$/), {
        message: 'No es una numero de telefono'
    }),
});

export default schema;