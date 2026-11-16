import { z } from "zod";

const schema = z.object({
    vitalSigns: z.object({
        temperature: z.coerce.string().nonempty(),
        bloodPressure: z.coerce.string().nonempty(),
        heartRate: z.coerce.string().nonempty(),
        respiratoryRate: z.coerce.string().nonempty(),
        oxygenSaturation: z.coerce.string().nonempty(),
        weight: z.coerce.number(),
        height: z.coerce.number(),
        bmi: z.coerce.number(),
        abdominalPerimeter: z.coerce.string().nonempty(),
    })
});

export type VitalSignSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<VitalSignSchemaType>): VitalSignSchemaType => ({
    vitalSigns: {
        temperature: data?.vitalSigns?.temperature ?? "",
        bloodPressure: data?.vitalSigns?.bloodPressure ?? "",
        heartRate: data?.vitalSigns?.heartRate ?? "",
        respiratoryRate: data?.vitalSigns?.respiratoryRate ?? "",
        oxygenSaturation: data?.vitalSigns?.oxygenSaturation ?? "",
        weight: data?.vitalSigns?.weight ?? 0,
        height: data?.vitalSigns?.height ?? 0,
        bmi: data?.vitalSigns?.bmi ?? 0,
        abdominalPerimeter: data?.vitalSigns?.abdominalPerimeter ?? "",
    }
})

export default schema;