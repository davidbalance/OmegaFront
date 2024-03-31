import { IFindService, IUpdateService, ResultAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindMedicalResultAndUpdateRQ, FindResultsRS, InsertMedicalReportRQ, MedicalResult } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class MedicalResultService
    extends AbstractService<ResultAPI>
    implements IFindService<any, MedicalResult>,
    IUpdateService<FindMedicalResultAndUpdateRQ, void>{

    async find(): Promise<MedicalResult[]> {
        try {
            const { results }: FindResultsRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return results;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): MedicalResult | Promise<MedicalResult> {
        throw new Error("Method not implemented.");
    }

    findAndUpdate(params: FindMedicalResultAndUpdateRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUpdate({ id, ...params }: FindMedicalResultAndUpdateRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_DISEASE(`${id}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    async findOneAndInsertReport({ id, ...params }: InsertMedicalReportRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_REPORT(`${id}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

}