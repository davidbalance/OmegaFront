'use server'

import auth from "@/lib/auth/auth";
import omegaEndpoint from "@/lib/api-client/omega-client/endpoints";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalOrder, MedicalOrderCloud, MedicalOrderDoctor, MedicalOrderExpanded, OrderStatus } from "@/lib/dtos/medical/order/base.response.dto";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";
import { revalidatePath } from "next/cache";

export const retriveCloud = async (id: number): Promise<MedicalOrderCloud> => {
    const data: MedicalOrderCloud = await omega()
        .addParams({ id })
        .execute('medicalOrderCloudDetails');
    return data;
}

export const searchMedicalOrderByDoctor = async (dni: string, filter: FilterMeta): Promise<MedicalOrderDoctor[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalOrderDoctor> = await omega()
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

export const searchMedicalOrderExpanded = async (filter: FilterMeta): Promise<MedicalOrderExpanded[]> => {
    const session = await auth();
    const { data }: ObjectArray<MedicalOrderExpanded> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalOrderExpandedSearch');

    return data;
}

export const countMedicalOrderExpanded = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('medicalOrderExpandedPages');

    return pages;
}

export const sendMail = async (order: number, mail: number): Promise<void> => {
    const session = await auth();
    await omega()
        .addBody({ order, mail })
        .addToken(session.access_token)
        .execute('medicalOrderMail');
    revalidatePath('/omega/admin/order');
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

const statusKeys: Record<OrderStatus, keyof typeof omegaEndpoint.methods> = {
    created: "medicalOrderUpdateStatusCreated",
    validated: "medicalOrderUpdateStatusValidate"
}
export const updateMedicalOrderStatus = async (id: number, action: OrderStatus): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addFlag('--no-body')
        .addToken(session.access_token)
        .execute(statusKeys[action]);
    revalidatePath('/omega/admin/order');
}

export const retriveMedicalOrderStatus = async (id: number): Promise<string> => {
    const session = await auth();
    const { orderStatus }: { orderStatus: string } = await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('medicalOrderUpdateStatusDetail');
    return orderStatus;
}

export const uploadMedicalOrder = async (id: number, body: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addParams({ id })
        .addBody(body)
        .addToken(session.access_token)
        .execute('medicalOrderUpload');
    revalidatePath('/omega/admin/order');
}

export const retriveMedicalOrderProcesses = async (): Promise<string[]> => {
    const session = await auth();
    const { data }: { data: string[] } = await omega()
        .addToken(session.access_token)
        .execute('medicalOrderProcess');
    return data;
}