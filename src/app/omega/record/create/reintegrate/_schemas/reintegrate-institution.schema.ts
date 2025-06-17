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
    jobPosition: z.coerce.string().nonempty(),
    workingEndDate: z.coerce.date().default(new Date()),
    workingReintegrationDate: z.coerce.date().default(new Date()),
    workingTime: z.coerce.number().positive().min(1),
    workingLeftCause: z.coerce.string().nonempty(),
});

export const adjustInitialValues = (data?: Partial<z.infer<typeof schema>>) => ({
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
    jobPosition: data?.jobPosition ?? '',
    workingEndDate: data?.workingEndDate ?? new Date(),
    workingReintegrationDate: data?.workingReintegrationDate ?? new Date(),
    workingTime: data?.workingTime ?? 1,
    workingLeftCause: data?.workingLeftCause ?? '',
});

export default schema;