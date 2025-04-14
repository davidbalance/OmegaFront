'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { AddMedicalReportPayload, CreateMedicalDiseasePayload, CreateMedicalTestPayload, EditMedicalDiseasePayload, EditMedicalTestExamPayload, MedicalDisease, MedicalDiseaseReportQuery, MedicalFileResult, MedicalFileZipPayload, MedicalReport, MedicalTest, MedicalTestQuery } from "./server-types";
import { revalidateTag } from "next/cache";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveMedicalDiseases = async (testId: string): Promise<MedicalDisease[]> => {
    const session = await auth();
    const data: MedicalDisease[] = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalDiseases');
    return data;
}

export const serverActionRetriveMedicalDisease = async (testId: string, diseaseId: string): Promise<MedicalDisease> => {
    const session = await auth();
    const data: MedicalDisease = await omega()
        .addToken(session.access_token)
        .addParams({ testId, diseaseId })
        .execute('retriveMedicalDisease');
    return data;
}

export const serverActionRetriveMedicalReport = async (testId: string): Promise<MedicalReport> => {
    const session = await auth();
    const data: MedicalReport = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalReport');
    return data;
}

export const serverActionRetriveMedicalReportFile = async (testId: string): Promise<Blob> => {
    const timestamp = Date.now();
    const data: Blob = await omega()
        .addParams({ testId })
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveMedicalReportFile');
    return data;
}

export const serverActionRetriveMedicalResultFile = async (testId: string): Promise<Blob> => {
    const timestamp = Date.now();
    const data: Blob = await omega()
        .addParams({ testId })
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveMedicalResultFile');
    return data;
}

export const serverActionRetriveMedicalTests = async (payload: MedicalTestQuery): Promise<MedicalTest[]> => {
    const { orderId, ...query } = payload;
    const session = await auth();
    const data: MedicalTest[] = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .addQuery(query)
        .execute('retriveMedicalTests');
    return data;
}

export const serverActionRetriveMedicalTest = async (testId: string): Promise<MedicalTest> => {
    const session = await auth();
    const data: MedicalTest = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalTest');
    return data;
}

export const serverActionRetriveMedicalDiseaseReportFile = async (query: MedicalDiseaseReportQuery): Promise<Blob> => {
    const timestamp = Date.now();
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveMedicalDiseaseReportFile');
    return data;
}


export const serverActionRetriveMedicalTestFileReport = async (): Promise<Blob> => {
    const timestamp = Date.now();
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveMedicalTestFileReport');
    return data;
}


export const serverActionRetriveMedicalTestFileCount = async (): Promise<MedicalFileResult> => {
    const session = await auth();
    const data: MedicalFileResult = await omega()
        .addToken(session.access_token)
        .execute('retriveMedicalTestFileCount');
    return data;
}

const createMedicalResultDisease = async (payload: CreateMedicalDiseasePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createMedicalResultDisease');

    revalidateTag('retriveMedicalDiseases');
    revalidateTag('retriveMedicalDiseaseReportFile');
}

const editMedicalResultDisease = async (payload: EditMedicalDiseasePayload): Promise<void> => {
    const { testId, diseaseReportId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId, diseaseReportId })
        .addBody({ ...body })
        .execute('editMedicalResultDisease');

    revalidateTag('retriveMedicalDiseases');
    revalidateTag('retriveMedicalDiseaseReportFile');
}

const removeMedicalResultDisease = async (payload: { diseaseReportId: string; testId: string; }): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeMedicalResultDisease');

    revalidateTag('retriveMedicalDiseases');
    revalidateTag('retriveMedicalDiseaseReportFile');
}

const addMedicalReport = async (payload: AddMedicalReportPayload): Promise<void> => {
    const { testId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addBody(body)
        .execute('addMedicalReport');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalOrdersDoctor');
}

const addMedicalReportFile = async (testId: string, formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addBody(formData)
        .execute('addMedicalReportFile');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalOrdersDoctor');
    revalidateTag('retriveMedicalTestZip');
    revalidateTag('retriveMedicalReportFile');
}

const removeMedicalReport = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('removeMedicalReport');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalTestZip');
    revalidateTag('retriveMedicalReportFile');
}

const addMedicalResult = async (testId: string, formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addBody(formData)
        .execute('addMedicalResult');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalTestZip');
    revalidateTag('retriveMedicalResultFile');
}

const removeMedicalResult = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('removeMedicalResult');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalTestZip');
    revalidateTag('retriveMedicalResultFile');
}

const checkMedicalTest = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addFlags(['--no-body'])
        .execute('checkMedicalTest');
}

const removeMedicalTest = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('removeMedicalTest');

    revalidateTag('retriveMedicalTests');
}

const createMedicalTest = async (payload: CreateMedicalTestPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createMedicalTest');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalTest');
}

const uncheckMedicalTest = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addFlags(['--no-body'])
        .execute('uncheckMedicalTest');
}

const checkMedicalTestFile = async (): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addFlags(['--no-body'])
        .execute('checkMedicalTestFile');
}

const editMedicalTestExam = async (payload: EditMedicalTestExamPayload): Promise<void> => {
    const { testId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addBody({ ...body })
        .execute('editMedicalTestExam');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalTest');
}

const retriveMedicalTestZip = async (payload: MedicalFileZipPayload[]): Promise<Blob> => {
    const timestamp = Date.now();
    const data: Blob = await omega()
        .addBody({ values: payload })
        .addQuery({ _cb: timestamp })
        .addCache('no-cache')
        .execute('retriveMedicalTestZip');
    return data;
}


export const serverActionCreateMedicalResultDisease = withResult(createMedicalResultDisease);
export const serverActionEditMedicalResultDisease = withResult(editMedicalResultDisease);
export const serverActionRemoveMedicalResultDisease = withResult(removeMedicalResultDisease);
export const serverActionAddMedicalReport = withResult(addMedicalReport);
export const serverActionAddMedicalReportFile = withResult(addMedicalReportFile);
export const serverActionRemoveMedicalReport = withResult(removeMedicalReport);
export const serverActionAddMedicalResult = withResult(addMedicalResult);
export const serverActionRemoveMedicalResult = withResult(removeMedicalResult);
export const serverActionCheckMedicalTest = withResult(checkMedicalTest);
export const serverActionRemoveMedicalTest = withResult(removeMedicalTest);
export const serverActionCreateMedicalTest = withResult(createMedicalTest);
export const serverActionUncheckMedicalTest = withResult(uncheckMedicalTest);
export const serverActionCheckMedicalTestFile = withResult(checkMedicalTestFile);
export const serverActionEditMedicalTestExam = withResult(editMedicalTestExam);
export const serverActionRetriveMedicalTestZip = withResult(retriveMedicalTestZip);