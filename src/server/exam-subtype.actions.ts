import { auth } from "@/app/api/auth/[...nextauth]/route";
import omega from "@/lib/api-client/omega-client/omega";
import { ExamSingleSubtype } from "@/lib/dtos/laboratory/exam/subtype/base.response.dto";
import { ObjectArray } from "@/lib/interfaces/object-array.interface";

export const retriveExamSubtype = async (exam: string): Promise<ExamSingleSubtype[]> => {
    const session = await auth();
    if (!session) throw new Error('There is no session found');
    const { data }: ObjectArray<ExamSingleSubtype> = await omega()
        .addParams({ exam })
        .addToken(session.access_token)
        .execute('examsubtypeDetails');
    return data;
}