import { z } from "zod";

const schema = z.object({
    reviewOfOrgansSkin: z.coerce.string().optional(),
    reviewOfOrgansSenseOrgans: z.coerce.string().optional(),
    reviewOfOrgansBreath: z.coerce.string().optional(),
    reviewOfOrgansCardiovascular: z.coerce.string().optional(),
    reviewOfOrgansDigestive: z.coerce.string().optional(),
    reviewOfOrgansUrinary: z.coerce.string().optional(),
    reviewOfOrgansSkeletalMuscle: z.coerce.string().optional(),
    reviewOfOrgansEndocrinic: z.coerce.string().optional(),
    reviewOfOrgansHemoLymphatic: z.coerce.string().optional(),
    reviewOfOrgansHighlyStrung: z.coerce.string().optional(),
})

export default schema;