import { z } from "zod";

const schema = z.object({
    vitalSignsBloodPressure: z.coerce.string().nonempty(),
    vitalSignsTemperature: z.coerce.string().nonempty(),
    vitalSignsHeartRate: z.coerce.string().nonempty(),
    vitalSignsOxygenSaturation: z.coerce.string().nonempty(),
    vitalSignsRespiratoryRate: z.coerce.string().nonempty(),
    vitalSignsWeight: z.coerce.number().min(1),
    vitalSignsSize: z.coerce.number().min(1),
    vitalSignsMassIndex: z.coerce.number().optional(),
    vitalSignsAbdominalPerimeter: z.coerce.string().nonempty(),
});

export const adjustInitialValues = (data?: Partial<z.infer<typeof schema>>) => ({
    vitalSignsBloodPressure: data?.vitalSignsBloodPressure ?? '',
    vitalSignsTemperature: data?.vitalSignsTemperature ?? '',
    vitalSignsHeartRate: data?.vitalSignsHeartRate ?? '',
    vitalSignsOxygenSaturation: data?.vitalSignsOxygenSaturation ?? '',
    vitalSignsRespiratoryRate: data?.vitalSignsRespiratoryRate ?? '',
    vitalSignsWeight: data?.vitalSignsWeight ?? 0,
    vitalSignsSize: data?.vitalSignsSize ?? 0,
    vitalSignsMassIndex: data?.vitalSignsMassIndex ?? 0,
    vitalSignsAbdominalPerimeter: data?.vitalSignsAbdominalPerimeter ?? '',
});

export default schema;