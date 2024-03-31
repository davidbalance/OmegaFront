import { AccessControlAPI, IUpdateService } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindAndUpdateResourcesRQ, FindAndUpdateRolesRQ } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class AccessControlService
    extends AbstractService<AccessControlAPI>{

    async findOneAndUpdateRoles({ user, ...params }: FindAndUpdateRolesRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_ROLES(`${user}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }
    
    async findOneAndUpdateResources({ user, ...params }: FindAndUpdateResourcesRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_RESOURCES(`${user}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }
}