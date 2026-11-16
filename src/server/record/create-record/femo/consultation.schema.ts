import { z } from "zod";

export const CONSULTATION_EVALUATION_TYPE_ENTRY = "entry"
export const CONSULTATION_EVALUATION_TYPE_PERIODIC = "periodic"
export const CONSULTATION_EVALUATION_TYPE_RETURN = "return"
export const CONSULTATION_EVALUATION_TYPE_RETIRE = "retirement"

const evaluationType: string[] = [
    CONSULTATION_EVALUATION_TYPE_ENTRY,
    CONSULTATION_EVALUATION_TYPE_PERIODIC,
    CONSULTATION_EVALUATION_TYPE_RETURN,
    CONSULTATION_EVALUATION_TYPE_RETIRE,
];
const validateEvaluationType = (arg: string) => evaluationType.includes(arg)

const consultationSchema = z.object({
    jobPosition: z.coerce.string().nonempty(),
    serviceDate: z.coerce.date(),
    work: z.object({
        startDate: z.coerce.date().optional(),
        returnDate: z.coerce.date().optional(),
        lastDate: z.coerce.date().optional(),
    }),
    evaluationType: z.string().default(CONSULTATION_EVALUATION_TYPE_ENTRY).refine(validateEvaluationType),
    observation: z.string().optional()
});

const schema = z.object({
    consultation: consultationSchema
})

export type ConsultationSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<ConsultationSchemaType>): ConsultationSchemaType => {

    let serviceDate = data?.consultation?.serviceDate ?? new Date();
    if (typeof data?.consultation?.serviceDate === "string") {
        serviceDate = new Date(data?.consultation?.serviceDate)
    }

    return {
        consultation: {
            jobPosition: data?.consultation?.jobPosition ?? "",
            serviceDate: data?.consultation?.serviceDate ?? new Date(),
            work: {
                ...data?.consultation?.work
            },
            evaluationType: data?.consultation?.evaluationType ?? CONSULTATION_EVALUATION_TYPE_ENTRY,
            observation: data?.consultation?.observation ?? ""
        }
    }
}

export default schema;