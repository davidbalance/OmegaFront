import { ResultAPI } from "@/lib/endpoints";
import { IFindFile, IFindService, IUpdateService } from "@/services/interfaces";
import { AbstractService } from "../abstract.service";
import { FindMedicalResultFileRQ, FindResultsRS, InsertMedicalReportRQ, InsertMedicalReportRS, MedicalResult, UpdateMedicalResultRQ } from "./dtos";
import { OmegaFetch } from "@/services/config";
import { blobFile } from "@/lib/utils/blob-to-file";

export class MedicalResultService
    extends AbstractService<ResultAPI>
    implements IFindService<any, MedicalResult>,
    IUpdateService<UpdateMedicalResultRQ, void>,
    IFindFile<FindMedicalResultFileRQ> {

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

    findAndUpdate(params: UpdateMedicalResultRQ): void | Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findFile({ id, name }: FindMedicalResultFileRQ) {
        try {
            const blob = await OmegaFetch.getFile<any, Blob>({
                url: this.endpoints.FIND_FILE(`${id}`)
            });
            blobFile(blob, `${name}.pdf`);
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate({ id, ...params }: UpdateMedicalResultRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_DISEASE(`${id}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    async findOneAndInsertReport({ id, ...params }: InsertMedicalReportRQ): Promise<InsertMedicalReportRS> {
        try {
            const data: InsertMedicalReportRS = await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_REPORT(`${id}`),
                body: params
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

}