import { z } from "zod";

const schema = z.object({
    companyName: z.coerce.string().nonempty(),
    companyRUC: z.coerce.string().length(13),
    companyCIU: z.coerce.string().nonempty(),
    institutionHealthFacility: z.coerce.string().default('Omega Salud Ocupacional.'),
    patientFirstName: z.coerce.string().nonempty(),
    patientMiddleName: z.coerce.string().nonempty(),
    patientLastName: z.coerce.string().nonempty(),
    patientSecondLastName: z.coerce.string().nonempty(),
    patientGender: z.coerce.string().refine(arg => ['male', 'female'].includes(arg), { message: 'Solo puede escoger entre Masculino o Femenino' }),
    patientAge: z.coerce.number().min(1),
    jobPosition: z.coerce.string().nonempty(),
    workingEndDate: z.date().default(new Date()),
    workingReintegrationDate: z.date().default(new Date()),
    workingTime: z.number().min(0),
    workingLeftCause: z.coerce.string().nonempty(),
});

export default schema;