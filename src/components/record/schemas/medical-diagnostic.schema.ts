import { z } from "zod";

const MedicalDiagnosticSchema = z.object({
    description: z.coerce.string().nonempty(),
    cie: z.coerce.string().nonempty(),
    pre: z.coerce.boolean().default(false),
    def: z.coerce.boolean().default(false),
});

const schema = z.object({
    diagnostics: z.array(MedicalDiagnosticSchema)
});

export default schema;