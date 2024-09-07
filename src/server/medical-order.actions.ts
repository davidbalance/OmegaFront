'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalOrder } from "@/lib/dtos/medical/order/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchMedicalOrder = async (filter: FilterMeta): Promise<MedicalOrder[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalOrder> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalOrderSearch');

    return data;
}

export const countMedicalOrder = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalOrderPages');

    return pages;
}