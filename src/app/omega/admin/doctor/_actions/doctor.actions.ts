'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { FilterMeta, CountMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { Doctor } from "@/lib/dtos/user/doctor/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchDoctors = async (filter: FilterMeta): Promise<Doctor[]> => {
    const session = await auth();
    const { data }: ObjectArray<Doctor> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('doctorSearch');
    return data;
}

export const countDoctors = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('doctorrPages');
    return pages;
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

/* export const retriveDoctors = async () => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetDoctorArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('doctorDetails');
    return data;
}
 */