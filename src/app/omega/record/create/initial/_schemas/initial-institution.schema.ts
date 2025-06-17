import { z } from "zod";

const schema = z.object({
    companyName: z.coerce.string().nonempty(),
    companyRUC: z.coerce.string().length(13),
    companyCIIU: z.coerce.string().optional(),
    institutionHealthFacility: z.coerce.string().default('Omega Salud Ocupacional.'),
    patientFirstName: z.coerce.string().nonempty(),
    patientMiddleName: z.coerce.string().nonempty(),
    patientLastName: z.coerce.string().nonempty(),
    patientSecondLastName: z.coerce.string().nonempty(),
    patientGender: z.coerce.string().refine(arg => ['male', 'female'].includes(arg), { message: 'Solo puede escoger entre Masculino o Femenino' }),
    patientAge: z.coerce.number().min(1),
    patientReligion: z.coerce.string().refine(arg => ['catholic', 'evangelical', "jehovah's witnesses", 'mormon', 'other'].includes(arg)),
    patientBloodType: z.coerce.string().nonempty(),
    patientLaterality: z.coerce.string().refine(arg => ['right', 'left', 'bisexual', 'heterosexual', 'unknown'].includes(arg)),
    patientSexualOrientation: z.coerce.string().refine(arg => ['lesbian', 'gay', 'bisexual', 'heterosexual', 'unknown'].includes(arg)),
    patientGenderIdentity: z.coerce.string().refine(arg => ['male', 'female', 'trans-female', 'trans-male', 'unknown'].includes(arg)),
    patientDisabilityType: z.coerce.string().optional(),
    patientDisabilityPercent: z.coerce.number().int().min(1).max(100).optional(),
    institutionJobStartDate: z.coerce.date(),
    institutionJobPosition: z.coerce.string().nonempty(),
    institutionJobArea: z.coerce.string().nonempty(),
    institutionJobActivities: z.coerce.string().nonempty(),
})
    .refine((arg) => !arg.patientDisabilityType ? true : !!arg.patientDisabilityPercent, { message: 'Debe colocar el porcentaje de discapacidad.', path: ['patientDisabilityPercent'] })

export const adjustInitialValue = (data?: Partial<z.infer<typeof schema>>) => ({
    companyName: data?.companyName ?? '',
    companyRUC: data?.companyRUC ?? '',
    companyCIIU: data?.companyCIIU ?? '',
    institutionHealthFacility: data?.institutionHealthFacility ?? 'Omega Salud Ocupacional',
    patientFirstName: data?.patientFirstName ?? '',
    patientMiddleName: data?.patientMiddleName ?? '',
    patientLastName: data?.patientLastName ?? '',
    patientSecondLastName: data?.patientSecondLastName ?? '',
    patientGender: data?.patientGender ?? 'male',
    patientAge: data?.patientAge ?? 0,
    patientReligion: data?.patientReligion ?? 'catholic',
    patientBloodType: data?.patientBloodType ?? 'ARh+',
    patientLaterality: data?.patientLaterality ?? 'right',
    patientSexualOrientation: data?.patientSexualOrientation ?? 'heterosexual',
    patientGenderIdentity: data?.patientGenderIdentity ?? 'male',
    patientDisabilityType: data?.patientDisabilityType ?? '',
    patientDisabilityPercent: data?.patientDisabilityPercent ?? 1,
    institutionJobStartDate: data?.institutionJobStartDate ?? new Date(),
    institutionJobPosition: data?.institutionJobPosition ?? '',
    institutionJobArea: data?.institutionJobArea ?? '',
    institutionJobActivities: data?.institutionJobActivities ?? '',
});

export default schema;