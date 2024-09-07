'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { CountMeta, FilterMeta, PageCount } from "@/lib/dtos/pagination.dto";
import { Patient } from "@/lib/dtos/user/patient/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const searchPatient = async (filter: FilterMeta): Promise<Patient[]> => {
    const session = await auth();
    const { data }: ObjectArray<Patient> = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('patientSearch');

    return data;
}

export const countPatient = async (filter: CountMeta): Promise<number> => {
    const session = await auth();
    const { pages }: PageCount = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('patientPages');

    return pages;
}