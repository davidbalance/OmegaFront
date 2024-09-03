import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamType } from "@/lib/dtos/laboratory/exam/type/base.response.dto";
import { GetExamTypeArrayResponseDto } from "@/lib/dtos/laboratory/exam/type/response.dto";

export const retriveExamType = async (): Promise<ExamType[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: GetExamTypeArrayResponseDto = await omega()
        .addToken(session.access_token)
        .execute('examtypeDetails');
    return data;
}