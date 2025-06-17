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
});

export const adjustInitalValues = (data?: Partial<z.infer<typeof schema>>) => ({
    reviewOfOrgansSkin: data?.reviewOfOrgansSkin ?? '',
    reviewOfOrgansSenseOrgans: data?.reviewOfOrgansSenseOrgans ?? '',
    reviewOfOrgansBreath: data?.reviewOfOrgansBreath ?? '',
    reviewOfOrgansCardiovascular: data?.reviewOfOrgansCardiovascular ?? '',
    reviewOfOrgansDigestive: data?.reviewOfOrgansDigestive ?? '',
    reviewOfOrgansUrinary: data?.reviewOfOrgansUrinary ?? '',
    reviewOfOrgansSkeletalMuscle: data?.reviewOfOrgansSkeletalMuscle ?? '',
    reviewOfOrgansEndocrinic: data?.reviewOfOrgansEndocrinic ?? '',
    reviewOfOrgansHemoLymphatic: data?.reviewOfOrgansHemoLymphatic ?? '',
    reviewOfOrgansHighlyStrung: data?.reviewOfOrgansHighlyStrung ?? '',
});

export default schema;