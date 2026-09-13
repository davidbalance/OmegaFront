'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { ClientRecord, ClientRecordMetadata, ClientRecordQuery } from "./server-types";
import { CertificateRecordPayload } from "./create-record/certificate-record";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";
import { FemoRecordPayload } from "./create-record/femo-record";

export const serverActionRetriveClientRecords = async (payload: ClientRecordQuery): Promise<ClientRecord[]> => {
    const { patientDni, ...query } = payload;
    const session = await auth();
    const data: ClientRecord[] = await omega()
        .addToken(session.access_token)
        .addParams({ patientDni })
        .addQuery({ ...query })
        .execute('retriveClientRecords');
    return data;
}

export const serverActionRetriveClientRecordFile = async (recordId: string): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ recordId })
        .addCache('no-cache')
        .execute('retriveClientRecordFile');
    return data;
}

export const serviceActionRetriveClientRecordMetadata = async (recordId: string): Promise<ClientRecordMetadata> => {
    const session = await auth();
    const data: ClientRecordMetadata = await omega()
        .addToken(session.access_token)
        .addParams({ recordId })
        .addCache('no-cache')
        .execute('retriveClientRecordMetadata');

    return data;
}

const createClientRecordFemo = async ({ patientDni, ...metadata }: FemoRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'femo';
    await createClientRecord(patientDni, type, metadata)
}

const createClientRecordCertificate = async ({ patientDni, ...metadata }: CertificateRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'certificado';
    await createClientRecord(patientDni, type, metadata)
}

const createClientRecord = async (patientDni: string, type: string, metadata: any): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: patientDni, type })
        .addBody({ metadata })
        .execute('createClientRecord');

    revalidateTag('retriveClientRecords');
}

export const updateClientRecord = async (patientDni: string, recordId: string, metadata: any): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: patientDni, recordId })
        .addBody({ metadata })
        .execute('updateClientRecord');

    revalidateTag('retriveClientRecords');
    revalidateTag('retriveClientRecordMetadata');
}

export const completeClientRecord = async (path: { patientDni: string, recordType: string, recordId: string }, metadata: any): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...path })
        .addBody({ metadata })
        .execute('completeClientRecord');

    revalidateTag('retriveClientRecords');
    revalidateTag('retriveClientRecordMetadata');
}

export const serverActionCreateClientRecordFemo = withResult(createClientRecordFemo);
export const serverActionCreateClientRecordCertificate = withResult(createClientRecordCertificate);
export const serverActionUpdateClientRecord = withResult(updateClientRecord);
export const serverActionCompleteClientRecord = withResult(completeClientRecord);