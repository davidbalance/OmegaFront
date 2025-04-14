import { ZodObject, ZodRawShape } from 'zod'

export const validateZodEnv = <T extends ZodRawShape>(schema: ZodObject<T>) =>
    (env: any) => {
        const result = schema.safeParse(env);

        if (result.error) {
            console.error(result.error.errors);
            throw new Error("Error loading the environment");
        }

        return result.data;
    }