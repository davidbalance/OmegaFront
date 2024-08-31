import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { OmegaNavResource } from "@/lib/dtos/omega/nav/resource/base.response.dto";
import { GetOmegaNavResourceArrayResponseDto } from "@/lib/dtos/omega/nav/resource/response.dto";

export const retriveNavResources = async (): Promise<OmegaNavResource[]> => {
    const session = await auth();
    if (!session) throw new Error('Something went wrong');
    const { data }: GetOmegaNavResourceArrayResponseDto = await omega().addToken(session.access_token).execute('navResourceDetails');
    return data;
}