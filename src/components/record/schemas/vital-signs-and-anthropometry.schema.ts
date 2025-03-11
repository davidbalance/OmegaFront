import { z } from "zod";

const schema = z.object({
    vitalSignsBloodPressure: z.coerce.number().min(0),
    vitalSignsTemperature: z.coerce.number().min(0),
    vitalSignsHeartRate: z.coerce.number().min(0),
    vitalSignsOxygenSaturation: z.coerce.number().min(0),
    vitalSignsRespiratoryRate: z.coerce.number().min(0),
    vitalSignsWeight: z.coerce.number().min(0),
    vitalSignsSize: z.coerce.number().min(0),
    vitalSignsMassIndex: z.coerce.number().min(0),
    vitalSignsAbdominalPerimeter: z.coerce.number().min(0),
})

export default schema;