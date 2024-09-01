import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { CorporativeGroup } from "@/lib/dtos/location/corporative/base.response.dto";
import { GetCorporativeGroupArrayResponseDto } from "@/lib/dtos/location/corporative/response.dto";

export const retriveCorporativeGroups = async (): Promise<CorporativeGroup[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetCorporativeGroupArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('corporativeGroupDetails');
    return data;
}