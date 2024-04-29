import { AbstractService } from "../abstract.service";
import { OmegaFetch } from "@/services/config";
import { pipeline } from "stream";
import { createWriteStream, write } from "fs";
import { blobFile } from "@/lib/utils/blob-to-file";
import { MedicalReportAPI } from "@/services/endpoints";
import { IFindFile } from "@/services/interfaces";
import { FindMedicalReportPDFRQ } from "./dtos";

export class MedicalReportService
    extends AbstractService<MedicalReportAPI>
    implements IFindFile<FindMedicalReportPDFRQ> {

    async findFile({ id, name }: FindMedicalReportPDFRQ) {
        try {
            const blob = await OmegaFetch.getFile<any, Blob>({
                url: this.endpoints.FIND_ONE_PDF(`${id}`)
            });
            blobFile(blob, `${name}.pdf`);
        } catch (error) {
            throw error;
        }
    }

}