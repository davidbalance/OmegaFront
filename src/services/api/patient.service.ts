import { FindPatientResponseDTO, IFindService } from "..";
import { OmegaFetch } from "../config";
import { PatientAPI } from "../endpoints/endpoint.type";
import { PatientModel } from "../models/patient.model";
import { AbstractService } from "./abstract.service";

export class PatientService
    extends AbstractService<PatientAPI>
    implements IFindService<PatientModel>{

    async find(): Promise<PatientModel[]> {
        try {
            const response = await OmegaFetch.get<{ patients: FindPatientResponseDTO[] }>({
                url: this.endpoints.FIND
            });
            const { patients } = response;
            return patients;
        } catch (error) {
            throw error;
        }
    }
}