'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { GetDoctorArrayResponseDto } from "@/lib/dtos/user/doctor/response.dto";

export const retriveDoctors = async () => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetDoctorArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('doctorDetails');
    return data;
}

export const retriveBlobSignature = async (id: number): Promise<Blob> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    return await omega()
        .addParams({ id })
        .addToken(session.access_token)
        .execute('doctorSignatureImage');
}

export const uploadSignature = async (id: number, formData: FormData): Promise<void> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .addBody(formData)
        .execute('doctorSignatureUpload');
}