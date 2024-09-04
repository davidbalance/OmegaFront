'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { MedicalOrder, OrderStatus } from "@/lib/dtos/medical/order/base.response.dto"
import { GetMedicalOrderArrayResponseDto } from "@/lib/dtos/medical/order/response.dto";
import { revalidatePath } from "next/cache";

export const retriveMedicalOrder = async (dni: string): Promise<MedicalOrder[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetMedicalOrderArrayResponseDto = await omega()
        .addParams({ dni })
        .addToken(session.access_token)
        .execute('medicalOrderDetailsByPatient');

    return data;
}

export const validateOrder = async (id: number, action: OrderStatus): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .addFlag('--no-body')
        .execute(action === 'created' ? 'medicalOrderUpdateStatusValidate' : 'medicalOrderUpdateStatusCreated');
    revalidatePath('');
}