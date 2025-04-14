'use server'

import auth from "@/lib/auth";
import omega from "@/lib/api-client/omega-client/omega";
import { EditExamPayload, Exam, ExamQuery, MoveExamPayload } from "./server-types";
import { withResult } from "@/lib/utils/result.utils";

export const serverActionRetriveExams = async (payload: ExamQuery): Promise<Exam[]> => {
    const { subtypeId, ...query } = payload;
    const session = await auth();
    const data: Exam[] = await omega()
        .addToken(session.access_token)
        .addParams({ subtypeId })
        .addQuery({ ...query })
        .execute('retriveExams');
    return data;
}

export const serverActionRetriveExam = async (examId: string): Promise<Exam> => {
    const session = await auth();
    const data: Exam = await omega()
        .addToken(session.access_token)
        .addParams({ examId })
        .execute('retriveExam');
    return data;
}

const editExam = async (payload: EditExamPayload): Promise<void> => {
    const { typeId, subtypeId, examId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ typeId, subtypeId, examId })
        .addBody({ ...body })
        .execute('editExam');
}

const moveExam = async (payload: MoveExamPayload): Promise<void> => {
    const { typeId, subtypeId, examId, ...body } = payload;
    const session = await auth();
    await omega()
        .addToken(session.access_token)
        .addParams({ typeId, subtypeId, examId })
        .addBody({ ...body })
        .execute('moveExam');
}

export const serverActionEditExam = withResult(editExam);
export const serverActionMoveExam = withResult(moveExam);