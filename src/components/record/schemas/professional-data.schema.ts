import { z } from "zod";

const schema = z.object({
    authorFullname: z.coerce.string().optional(),
    authorDni: z.coerce.string().optional()
})
    .superRefine((data, ctx) => {
        if (!!data.authorFullname || !!data.authorDni) {
            if (!data.authorFullname) {
                ctx.addIssue({
                    path: ['authorFullname'],
                    code: z.ZodIssueCode.custom,
                    message: 'Debe agregar el nombre del profesional'
                });
            }
            if (!data.authorDni) {
                ctx.addIssue({
                    path: ['authorDni'],
                    code: z.ZodIssueCode.custom,
                    message: 'Debe agregar la cedula del profesional'
                });
            }
        }
    });

export const adjustInitialValues = (values?: Partial<z.infer<typeof schema>>): z.infer<typeof schema> => ({
    authorFullname: values?.authorFullname ?? '',
    authorDni: values?.authorDni ?? '',
});

export default schema;