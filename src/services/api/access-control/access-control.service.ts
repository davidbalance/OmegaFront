import { AccessControlAPI } from "@/services/endpoints";
import { AbstractService } from "../abstract.service";
import { ACClient, FindACClientRQ, FindAndUpdateACResourcesRQ, FindAndUpdateACRolesRQ, FindOneACClientRS } from "./dtos";
import { OmegaFetch } from "@/services/config";
import { IFindService } from "@/services/interfaces";

export class AccessControlService
    extends AbstractService<AccessControlAPI>
    implements IFindService<FindACClientRQ, ACClient> {

    find(): ACClient[] | Promise<ACClient[]>;
    find(params: FindACClientRQ): ACClient[] | Promise<ACClient[]>;
    find(params?: unknown): ACClient[] | Promise<ACClient[]> {
        throw new Error("Method not implemented.");
    }

    async findOne({ user }: FindACClientRQ): Promise<ACClient> {
        try {
            const client = await OmegaFetch.get<any, FindOneACClientRS>({ url: this.endpoints.FIND_ONE(user) });
            return client;
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdateRoles({ user, ...params }: FindAndUpdateACRolesRQ): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.FIND_ONE_AND_UPDATE_ROLES(`${user}`),
                body: params
            })
        } catch (error) {
            throw error;
        }
    }

    async findOneAndUpdateResources({ user, ...params }: FindAndUpdateACResourcesRQ): Promise<void> {
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