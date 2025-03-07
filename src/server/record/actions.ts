'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { ClientRecord, ClientRecordQuery } from "./server-types";

export const retriveClientRecords = async (payload: ClientRecordQuery): Promise<ClientRecord[]> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: ClientRecord[] = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveClientRecords');
    return data;
}

export const retriveClientRecordFile = async (recordId: string): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ recordId })
        .execute('retriveClientRecordFile');
    return data;
}