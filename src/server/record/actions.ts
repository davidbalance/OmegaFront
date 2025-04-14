'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { ClientRecord, ClientRecordQuery } from "./server-types";
import { InitialRecordPayload } from "./create-record/initial-record";
import { PeriodicRecordPayload } from "./create-record/periodic-record";
import { ReintegrateRecordPayload } from "./create-record/reintegrate-record";
import { RetirementRecordPayload } from "./create-record/retirement-record";
import { CertificateRecordPayload } from "./create-record/certificate-record";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

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

const createClientRecordInitial = async (payload: InitialRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'initial';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');

    revalidateTag('retriveClientRecords');
}

const createClientRecordPeriodic = async (payload: PeriodicRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'periodic';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');

    revalidateTag('retriveClientRecords');
}

const createClientRecordReintegrate = async (payload: ReintegrateRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'reintegrate';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');

    revalidateTag('retriveClientRecords');
}

const createClientRecordRetirement = async (payload: RetirementRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'retirement';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');

    revalidateTag('retriveClientRecords');
}

const createClientRecordCertificate = async (payload: CertificateRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'certificate';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');

    revalidateTag('retriveClientRecords');
}

export const serverActionCreateClientRecordInitial = withResult(createClientRecordInitial);
export const serverActionCreateClientRecordPeriodic = withResult(createClientRecordPeriodic);
export const serverActionCreateClientRecordReintegrate = withResult(createClientRecordReintegrate);
export const serverActionCreateClientRecordRetirement = withResult(createClientRecordRetirement);
export const serverActionCreateClientRecordCertificate = withResult(createClientRecordCertificate);