import { z } from "zod";

const schema = z.object({
    patientName: z.coerce.string().nonempty(),
    patientLastname: z.coerce.string().nonempty(),
    patientDni: z.coerce.string().max(16).nonempty(),
    patientEmail: z.coerce.string().email(),
    patientGender: z.coerce.string().refine(e => ['male', 'female'].includes(e), {
        message: 'Opcion invalida'
    }),
    patientBirthday: z.coerce.date(),
    patientRole: z.coerce.string().refine(e => /[0-9]/.test(e)).optional()
});

export default schema;