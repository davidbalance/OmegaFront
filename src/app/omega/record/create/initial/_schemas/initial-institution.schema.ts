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
    patientReligion: z.coerce.string().refine(arg => ['catholic', 'evangelical', "jehovah's witnesses", 'mormon', 'other'].includes(arg)),
    patientOtherReligion: z.coerce.string().optional(),
    patientBloodType: z.coerce.string().nonempty(),
    patientLaterality: z.coerce.string().nonempty(),
    patientSexualOrientation: z.coerce.string().refine(arg => ['lesbian', 'gay', 'bisexual', 'heterosexual', 'unknown'].includes(arg)),
    patientGenderIdentity: z.coerce.string().refine(arg => ['male', 'female', 'trans-female', 'trans-male', 'unknown'].includes(arg)),
    patientDisabilityType: z.coerce.string().optional(),
    patientDisabilityPercent: z.coerce.number().min(0.01).max(100).optional(),
    jobStartDate: z.coerce.date(),
    jobPosition: z.coerce.string().nonempty(),
    jobArea: z.coerce.string().nonempty(),
    jobActivity: z.coerce.string().nonempty(),
})
    .refine((arg) => arg.patientReligion === 'other' ? !!arg.patientOtherReligion : true, { message: 'No se ha indicado otra religion.', path: ['patientOtherReligion'] })
    .refine((arg) => !arg.patientDisabilityType ? true : !!arg.patientDisabilityPercent, { message: 'Debe colocar el porcentaje de discapacidad.', path: ['patientDisabilityPercent'] })

export default schema;