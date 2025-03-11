'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth";
import { AddMedicalReportPayload, CreateMedicalDiseasePayload, CreateMedicalTestPayload, EditMedicalDiseasePayload, EditMedicalTestExamPayload, MedicalDisease, MedicalDiseaseReportQuery, MedicalFileResult, MedicalFileZipPayload, MedicalReport, MedicalTest, MedicalTestQuery } from "./server_types";
import { revalidateTag } from "next/cache";

export const retriveMedicalDiseases = async (testId: string): Promise<MedicalDisease[]> => {
    const session = await auth();
    const data: MedicalDisease[] = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalDiseases');
    return data;
}

export const retriveMedicalDisease = async (testId: string, diseaseId: string): Promise<MedicalDisease> => {
    const session = await auth();
    const data: MedicalDisease = await omega()
        .addToken(session.access_token)
        .addParams({ testId, diseaseId })
        .execute('retriveMedicalDisease');
    return data;
}

export const retriveMedicalReport = async (testId: string): Promise<MedicalReport> => {
    const session = await auth();
    const data: MedicalReport = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalReport');
    return data;
}

export const retriveMedicalReportFile = async (testId: string): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalReportFile');
    return data;
}

export const retriveMedicalResultFile = async (testId: string): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalResultFile');
    return data;
}

export const retriveMedicalTests = async (payload: MedicalTestQuery): Promise<MedicalTest[]> => {
    const { orderId, ...query } = payload;
    const session = await auth();
    const data: MedicalTest[] = await omega()
        .addToken(session.access_token)
        .addParams({ orderId })
        .addQuery(query)
        .execute('retriveMedicalTests');
    return data;
}

export const retriveMedicalTest = async (testId: string): Promise<MedicalTest> => {
    const session = await auth();
    const data: MedicalTest = await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('retriveMedicalTest');
    return data;
}

export const retriveMedicalDiseaseReportFile = async (query: MedicalDiseaseReportQuery): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addQuery({ ...query })
        .execute('retriveMedicalDiseaseReportFile');
    return data;
}


export const retriveMedicalTestFileReport = async (): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .execute('retriveMedicalTestFileReport');
    return data;
}


export const retriveMedicalTestFileCount = async (): Promise<MedicalFileResult> => {
    const session = await auth();
    const data: MedicalFileResult = await omega()
        .addToken(session.access_token)
        .execute('retriveMedicalTestFileCount');
    return data;
}

export const createMedicalResultDisease = async (payload: CreateMedicalDiseasePayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createMedicalResultDisease');

    revalidateTag('retriveMedicalDiseases');
}

export const editMedicalResultDisease = async (payload: EditMedicalDiseasePayload): Promise<void> => {
    const { testId, diseaseReportId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId, diseaseReportId })
        .addBody({ ...body })
        .execute('editMedicalResultDisease');

    revalidateTag('retriveMedicalDiseases');
}

export const removeMedicalResultDisease = async (payload: { diseaseReportId: string; testId: string; }): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ ...payload })
        .execute('removeMedicalResultDisease');

    revalidateTag('retriveMedicalDiseases');
}

export const addMedicalReport = async (payload: AddMedicalReportPayload): Promise<void> => {
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

export const addMedicalReportFile = async (testId: string, formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addBody(formData)
        .execute('addMedicalReportFile');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalOrdersDoctor');
}

export const removeMedicalReport = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('removeMedicalReport');

    revalidateTag('retriveMedicalTests');
}

export const addMedicalResult = async (testId: string, formData: FormData): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addBody(formData)
        .execute('addMedicalResult');

    revalidateTag('retriveMedicalTests');
}

export const removeMedicalResult = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .execute('removeMedicalResult');

    revalidateTag('retriveMedicalTests');
}

export const checkMedicalTest = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addFlags(['--no-body'])
        .execute('checkMedicalTest');
}

export const createMedicalTest = async (payload: CreateMedicalTestPayload): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addBody({ ...payload })
        .execute('createMedicalTest');

    revalidateTag('retriveMedicalTests');
    revalidateTag('retriveMedicalTest');
}

export const uncheckMedicalTest = async (testId: string): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ testId })
        .addFlags(['--no-body'])
        .execute('uncheckMedicalTest');
}

export const checkMedicalTestFile = async (): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addFlags(['--no-body'])
        .execute('checkMedicalTestFile');
}

export const editMedicalTestExam = async (payload: EditMedicalTestExamPayload): Promise<void> => {
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

export const retriveMedicalTestZip = async (payload: MedicalFileZipPayload[]): Promise<Blob> => {
    const session = await auth();
    const data: Blob = await omega()
        .addToken(session.access_token)
        .addBody({ values: payload })
        .execute('retriveMedicalTestZip');
    return data;
}