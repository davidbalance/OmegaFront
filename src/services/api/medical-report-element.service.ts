import { FindMedicalReportElementResponseDTO, ICrudService, MedicalReportElementModel } from "..";
import { OmegaFetch } from "../config";
import { MedicalReportElementAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class MedicalReportElementService
    extends AbstractService<MedicalReportElementAPI>
    implements ICrudService<MedicalReportElementModel, number>
{
    async create(value: any): Promise<MedicalReportElementModel> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }

    async find(): Promise<MedicalReportElementModel[]> {
        try {
            const reponse = await OmegaFetch.get<{ elements: FindMedicalReportElementResponseDTO[] }>({
                url: this.endpoints.FIND
            });
            const { elements } = reponse;
            return elements;
        } catch (error) {
            throw error;
        }
    }

    async findOne(key: number): Promise<MedicalReportElementModel> {
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

    async findOneAndUpdate(key: number, value: Partial<MedicalReportElementModel>): Promise<void> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw error;
        }
    }

}