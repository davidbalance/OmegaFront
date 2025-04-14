import { z } from "zod";

const GeneralExamResultSchema = z.object({
    exam: z.coerce.string().nonempty(),
    date: z.coerce.date().default(new Date()),
    result: z.coerce.string().nonempty(),
});

const schema = z.object({
    generalExamResults: z.array(GeneralExamResultSchema),
    generalExamObservation: z.coerce.string()
});

export default schema;