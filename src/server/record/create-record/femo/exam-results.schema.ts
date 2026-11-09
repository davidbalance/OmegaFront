import { z } from "zod";

const examResultSchema = z.object({
    name: z.string().nonempty(),
    date: z.date(),
    result: z.string().nonempty()
})

export const DEFAULT_EXAM_RESULT: z.infer<typeof examResultSchema> = {
    date: new Date(),
    name: "",
    result: ""
}

const schema = z.object({
    examResults: z.object({
        exams: z.array(examResultSchema),
        observations: z.coerce.string().optional()
    })
});

export type ExamResultSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<ExamResultSchemaType>): ExamResultSchemaType => ({
    examResults: {
        exams: data?.examResults?.exams ?? [DEFAULT_EXAM_RESULT],
        observations: data?.examResults?.observations ?? ""
    }
})

export default schema;