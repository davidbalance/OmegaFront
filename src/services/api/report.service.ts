import { CreateMedicalReportRequestDTO, ICreateService, ICrudService, MedicalReportModel } from "..";
import { OmegaFetch } from "../config";
import { MedicalReportAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class ReportService
    extends AbstractService<MedicalReportAPI>
    implements ICrudService<MedicalReportModel, number> {

    async create(value: any): Promise<MedicalReportModel> {
        try {
            const body: CreateMedicalReportRequestDTO = { ...value };
            await OmegaFetch.post({
                url: this.endpoints.CREATE,
                body: body
            });
            return value;
        } catch (error) {
            throw error;
        }
    }

    async find(): Promise<MedicalReportModel[]> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }

    async findOne(key: number): Promise<MedicalReportModel> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }

    async findOneAndDelete(key: number): Promise<void> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdate(key: number, value: Partial<MedicalReportModel>): Promise<void> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }

}