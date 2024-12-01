'use server'

import omega from "@/lib/api-client/omega-client/omega";
import auth from "@/lib/auth/auth";

export type Checklist = {
    clientDni: string;
    clientName: string;
    clientLastname: string;
    jobPosition: string;
    process: string;
    companyRuc: string;
    companyName: string;
    createAt: Date;
    exams: {
        id: number
        examName: string,
        checklistStatus: boolean
    }[]
}
export const retriveChecklist = async (id: number): Promise<Checklist> => {
    const session = await auth();
    const data = await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .execute('medicalChecklistDetails');
    return data;

}
export const updateChecklist = async (id: number, status: boolean): Promise<void> => {
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ id })
        .addBody({ status })
        .execute('medicalChecklistUpdate');
}