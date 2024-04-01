import { DoctorAPI, IFindService } from "@/services";
import { AbstractService } from "../abstract.service";
import { Doctor, FindDoctorsRS, FindOneAndUploadSignature } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class DoctorService
    extends AbstractService<DoctorAPI>
    implements IFindService<any, Doctor>{
    find(): Doctor[] | Promise<Doctor[]>;
    find(params: any): Doctor[] | Promise<Doctor[]>;
    async find(params?: any): Promise<Doctor[]> {
        if (params) return [];
        try {
            const { doctors }: FindDoctorsRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return doctors;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): Doctor | Promise<Doctor> {
        throw new Error("Method not implemented.");
    }

    async findOneAndUploadFile({ file, id }: FindOneAndUploadSignature) {
        try {
            const form = new FormData();
            form.append('signature', file);
            await OmegaFetch.sendFile({
                url: this.endpoints.FIND_ONE_AND_UPDATE_SIGNATURE(`${id}`),
                body: form
            })
        } catch (error) {
            throw error;
        }
    }
}