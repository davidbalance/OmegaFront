import { z } from "zod";

const MedicalDiagnosticSchema = z.object({
    description: z.coerce.string().nonempty(),
    cie: z.coerce.string().nonempty(),
    flag: z.coerce.string().refine(arg => ['pre', 'def'].includes(arg), { message: 'No es un valor correcto' }),
});

const schema = z.object({
    diagnostics: z.array(MedicalDiagnosticSchema)
});

export default schema;