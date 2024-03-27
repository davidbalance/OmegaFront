import { FindPermissionsResponseDTO, IFindService, PermissionModel } from "..";
import { OmegaFetch } from "../config";
import { PermissionAPI } from "../endpoints/endpoint.type";
import { AbstractService } from "./abstract.service";

export class PermissionService
    extends AbstractService<PermissionAPI>
    implements IFindService<PermissionModel> {

    async find(): Promise<PermissionModel[]> {
        try {
            const response = await OmegaFetch.get<{ permissions: FindPermissionsResponseDTO[] }>({ url: this.endpoints.FIND });
            const { permissions } = response;
            return permissions;
        } catch (error) {
            throw error;
        }
    }

}