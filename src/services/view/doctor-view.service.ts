import { DoctorFullModel, IConfigurationService } from "..";
import { DoctorService } from "../api/doctor.service";
import endpoints from "../endpoints/endpoints";

type DoctorViewConfiguration = {
    doctors: DoctorFullModel[]
}

export class DoctorViewService implements IConfigurationService<DoctorViewConfiguration>{
    private readonly doctorService = new DoctorService(endpoints.DOCTOR.V1);

    async initialConfiguration(): Promise<DoctorViewConfiguration> {
        try {
            const doctors = await this.doctorService.find();
            const processedDoctors: DoctorFullModel[] = doctors.map((e) => ({ ...e.user, ...e }));
            return { doctors: processedDoctors };
        } catch (error) {
            throw error;
        }
    }

    reloadConfiguration(): DoctorViewConfiguration | Promise<DoctorViewConfiguration> {
        return this.initialConfiguration();
    }
}