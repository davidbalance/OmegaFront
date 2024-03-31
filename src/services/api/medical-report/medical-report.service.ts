import { IFindFile, MedicalReportAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindMedicalReportPDF } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class MedicalReportService
    extends AbstractService<MedicalReportAPI>
    implements IFindFile<FindMedicalReportPDF> {

    async findFile({ id }: FindMedicalReportPDF) {
        try {
            await OmegaFetch.get({
                url: this.endpoints.FIND_ONE_PDF(`${id}`)
            });
        } catch (error) {
            throw error;
        }
    }

}