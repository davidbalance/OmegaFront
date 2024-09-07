import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { LocationResponse } from "@/lib/dtos/location/corporative/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveLocation = async (): Promise<LocationResponse[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<LocationResponse> = await omega()
        .addToken(session.access_token)
        .execute('corporativeGroupOptions');
    return data;
}