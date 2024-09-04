import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { Disease } from "@/lib/dtos/disease/base.response.dto";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchDisease = async (filter: FilterMeta, group: number): Promise<Disease[]> => {
    const session = await auth();
    const { data }: ObjectArray<Disease> = await omega()
        .addQuery({ ...filter })
        .addParams({ group })
        .addToken(session.access_token)
        .execute('diseaseSearch');
    return data;
}

export const countDisease = async (filter: CountMeta, group: number): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addParams({ group })
        .addToken(session.access_token)
        .execute('diseasePages');
    return pages;
}