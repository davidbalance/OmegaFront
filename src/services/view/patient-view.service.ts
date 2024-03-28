import { IConfigurationService, IFindService } from "..";
import { PatientService } from "../api/patient.service";
import endpoints from "../endpoints/endpoints";
import { PatientFullModel, PatientModel } from "../models/patient.model";

type PatientViewConfiguration = {
    patients: PatientFullModel[]
}
export class PatientViewService
    implements IConfigurationService<PatientViewConfiguration> {
    private readonly patientService: IFindService<PatientModel> = new PatientService(endpoints.PATIENT.V1);

    async initialConfiguration(): Promise<PatientViewConfiguration> {
        try {
            const patients: PatientModel[] = await this.patientService.find();
            const processedPatients: PatientFullModel[] = patients.map((e) => ({ ...e.user, ...e }));
            return { patients: processedPatients };
        } catch (error) {
            throw error;
        }
    }

    reloadConfiguration(): PatientViewConfiguration | Promise<PatientViewConfiguration> {
        return this.initialConfiguration();
    }

}