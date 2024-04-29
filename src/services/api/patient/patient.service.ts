import { IFindService } from "@/services/interfaces";
import { PatientAPI } from '@/services/endpoints'
import { AbstractService } from "../abstract.service";
import { FindPatientsRS, Patient } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class PatientService
    extends AbstractService<PatientAPI>
    implements IFindService<any, Patient> {

    find(): Patient[] | Promise<Patient[]>;
    find(params: any): Patient[] | Promise<Patient[]>;
    async find(params?: unknown): Promise<Patient[]> {
        try {
            const { patients }: FindPatientsRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return patients;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): Patient | Promise<Patient> {
        throw new Error("Method not implemented.");
    }
}