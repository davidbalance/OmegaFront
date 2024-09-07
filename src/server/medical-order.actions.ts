'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omegaEndpoint from "@/lib/api-client/omega-client/endpoints";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalOrder, MedicalOrderCloud, MedicalOrderExpanded } from "@/lib/dtos/medical/order/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveCloud = async (id: number): Promise<MedicalOrderCloud> => {
    const data: MedicalOrderCloud = await omega()
        .addParams({ id })
        .execute('medicalOrderCloudDetails');
    return data;
}

export const searchMedicalOrderByDoctor = async (dni: string, filter: FilterMeta): Promise<MedicalOrder[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalOrder> = await omega()
        .addQuery({ ...filter })
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderByDoctorSearch');

    return data;
}

export const countMedicalOrderByDoctor = async (dni: string, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderByDoctorPages');

    return pages;
}

export const searchMedicalOrderExpanded = async (dni: string, filter: FilterMeta): Promise<MedicalOrderExpanded[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalOrderExpanded> = await omega()
        .addQuery({ ...filter })
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderExpandedSearch');

    return data;
}

export const countMedicalOrderExpanded = async (dni: string, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderExpandedPages');

    return pages;
}

export const sendMail = async (order: number, mail: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ order, mail })
        .addToken(session.access_token)
        .execute('medicalOrderMail');
}

export const searchMedicalOrder = async (dni: string, filter: FilterMeta): Promise<MedicalOrder[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalOrder> = await omega()
        .addQuery({ ...filter })
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderSearch');

    return data;
}

export const countMedicalOrder = async (dni: string, filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderPages');

    return pages;
}

const statusKeys: Record<string, keyof typeof omegaEndpoint.methods> = {
    "created": "medicalOrderUpdateStatusCreated",
    "validate": "medicalOrderUpdateStatusValidate"
}
export const updateMedicalOrderStatus = async (id: number, action: keyof typeof statusKeys): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addFlag('--no-body')
        .addToken(session.access_token)
        .execute(statusKeys[action]);
}
