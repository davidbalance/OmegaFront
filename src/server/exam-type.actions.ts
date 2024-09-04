import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamType, ExamTypeSingle } from "@/lib/dtos/laboratory/exam/type/base.response.dto";
import { GetExamTypeArrayResponseDto } from "@/lib/dtos/laboratory/exam/type/response.dto";
import { FilterMeta } from "@/lib/dtos/pagination.dto";

export const retriveFullExam = async (): Promise<ExamType[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('examtypeFullDetails');
    return data;
}

export const searchExamtype = async (filter: FilterMeta): Promise<ExamTypeSingle[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examtypeSearch');
    return data;
}

export const countExamtype = async (filter: FilterMeta): Promise<ExamTypeSingle[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addQuery({ ...filter })
        .addToken(session.access_token)
        .execute('examtypeSearch');
    return data;
}