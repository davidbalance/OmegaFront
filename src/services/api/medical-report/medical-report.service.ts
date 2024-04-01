import { IFindFile, MedicalReportAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindMedicalReportPDF } from "./dtos";
import { OmegaFetch } from "@/services/config";
import { pipeline } from "stream";
import { createWriteStream, write } from "fs";
import { blobFile } from "@/lib/utils/blob-to-file";

export class MedicalReportService
    extends AbstractService<MedicalReportAPI>
    implements IFindFile<FindMedicalReportPDF> {

    async findFile({ id, name }: FindMedicalReportPDF) {
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