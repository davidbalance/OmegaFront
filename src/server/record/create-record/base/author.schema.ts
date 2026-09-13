import { z } from "zod";

export const LOGO_NONE = "none"
export const LOGO_OMEGA = "omega"
const validLogo = [LOGO_NONE, LOGO_OMEGA]

const schema = z.object({
    logo: z.string().default(LOGO_NONE).refine(arg => validLogo.includes(arg)),
    author: z.object({
        fullname: z.string().optional(),
        dni: z.string().optional(),
    })
})

export type AuthorSchemaType = z.infer<typeof schema>

export const adjustInitialValue = (data?: Partial<AuthorSchemaType>): AuthorSchemaType => ({
    logo: data?.logo ?? LOGO_NONE,
    author: {
        fullname: data?.author?.fullname ?? "",
        dni: data?.author?.dni ?? "",
    }
})

export default schema;