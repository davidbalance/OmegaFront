import { DoctorModel, FindDoctorResponseDTO, IFindService } from "..";
import { OmegaFetch } from "../config";
import { DoctorAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class DoctorService
    extends AbstractService<DoctorAPI>
    implements IFindService<DoctorModel> {

    async find(): Promise<DoctorModel[]> {
        try {
            const response = await OmegaFetch.get<{ doctors: FindDoctorResponseDTO[] }>({
                url: this.endpoints.FIND
            });
            const { doctors } = response;
            return doctors;
        } catch (error) {
            throw error;
        }
    }
}