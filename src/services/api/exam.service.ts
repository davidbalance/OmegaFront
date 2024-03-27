import { ExamModel, FindExamResponseDTO, IFindService } from "..";
import { OmegaFetch } from "../config";
import { ExamAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class ExamService
    extends AbstractService<ExamAPI>
    implements IFindService<ExamModel> {

    async find(): Promise<ExamModel[]> {
        try {
            const response = await OmegaFetch.get<{ exams: FindExamResponseDTO[] }>({ url: this.endpoints.FIND });
            const { exams } = response;
            return exams
        } catch (error) {
            throw error;
        }
    }

}