import { z } from "zod";

const schema = z.object({
    vitalSignsBloodPressure: z.coerce.string().nonempty(),
    vitalSignsTemperature: z.coerce.string().nonempty(),
    vitalSignsHeartRate: z.coerce.string().nonempty(),
    vitalSignsOxygenSaturation: z.coerce.string().nonempty(),
    vitalSignsRespiratoryRate: z.coerce.string().nonempty(),
    vitalSignsWeight: z.coerce.string().nonempty(),
    vitalSignsSize: z.coerce.string().nonempty(),
    vitalSignsMassIndex: z.coerce.string().nonempty(),
    vitalSignsAbdominalPerimeter: z.coerce.string().nonempty(),
});

export const adjustInitialValues = (data?: Partial<z.infer<typeof schema>>) => ({
    vitalSignsBloodPressure: data?.vitalSignsBloodPressure ?? '',
    vitalSignsTemperature: data?.vitalSignsTemperature ?? '',
    vitalSignsHeartRate: data?.vitalSignsHeartRate ?? '',
    vitalSignsOxygenSaturation: data?.vitalSignsOxygenSaturation ?? '',
    vitalSignsRespiratoryRate: data?.vitalSignsRespiratoryRate ?? '',
    vitalSignsWeight: data?.vitalSignsWeight ?? '',
    vitalSignsSize: data?.vitalSignsSize ?? '',
    vitalSignsMassIndex: data?.vitalSignsMassIndex ?? '',
    vitalSignsAbdominalPerimeter: data?.vitalSignsAbdominalPerimeter ?? '',
});

export default schema;