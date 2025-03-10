'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { ClientRecord, ClientRecordQuery } from "./server-types";
import { InitialRecordPayload } from "./create-record/initial-record";
import { PeriodicRecordPayload } from "./create-record/periodic-record";
import { ReintegrateRecordPayload } from "./create-record/reintegrate-record";
import { RetirementRecordPayload } from "./create-record/retirement-record";

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

export const createClientRecordInitial = async (payload: InitialRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'initial';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');
}

export const createClientRecordPeriodic = async (payload: PeriodicRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'periodic';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');
}

export const createClientRecordReintegrate = async (payload: ReintegrateRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'reintegrate';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');
}

export const createClientRecordRetirement = async (payload: RetirementRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'retirement';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');
}

export const createClientRecordCertificate = async (payload: RetirementRecordPayload & { patientDni: string }): Promise<void> => {
    const type: string = 'certificate';
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ patientDni: payload.patientDni, type })
        .addBody({ ...payload })
        .execute('createClientRecord');
}