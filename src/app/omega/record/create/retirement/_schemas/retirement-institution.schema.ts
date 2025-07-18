import dayjs from "dayjs";
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
    workStartDate: z.date().default(new Date()),
    workingTime: z.coerce.number().optional(),
    workingEndDate: z.date().default(new Date()),
    jobPosition: z.coerce.string().nonempty(),
}).superRefine((data, ctx) => {
    const dayDifference = dayjs(data.workingEndDate).diff(data.workStartDate, 'day');
    if (dayDifference < 1) {
        console.log(dayDifference)
        const issue = {
            code: z.ZodIssueCode.custom,
            message: "La diferencia entre el inicio y fin de labores tiene que ser mayor a 0 dias."
        };
        ctx.addIssue({
            path: ['workStartDate'],
            ...issue
        });
        ctx.addIssue({
            path: ['workingEndDate'],
            ...issue
        });
    }
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
    workStartDate: data?.workStartDate ?? new Date(),
    workingTime: data?.workingTime ?? 0,
    workingEndDate: data?.workingEndDate ?? new Date(),
    jobPosition: data?.jobPosition ?? '',
})

export default schema;