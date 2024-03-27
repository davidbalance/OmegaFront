import { IFindService, ResultModel } from "..";
import { OmegaFetch } from "../config";
import { FindOneResultAndInsertMorbidityRequestDTO, FindOneResultAndInsertMorbidityResponseDTO, FindResultResponseDTO } from "../dtos/result";
import { ResultAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class ResultService
    extends AbstractService<ResultAPI>
    implements IFindService<ResultModel>
{
    async find(): Promise<ResultModel[]> {
        try {
            const response = await OmegaFetch.get<{ results: FindResultResponseDTO[] }>({ url: this.endpoints.FIND });
            const { results } = response;
            return results;
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdateMorbidity(key: number, value: number): Promise<void> {
        try {
            const data: FindOneResultAndInsertMorbidityRequestDTO = { morbidity: value }
            await OmegaFetch
                .patch<FindOneResultAndInsertMorbidityResponseDTO>({
                    url: this.endpoints.FIND_ONE_AND_INSERT_MORBIDITY(key),
                    body: data
                });
            return;
        } catch (error) {
            throw error;
        }
    }
}