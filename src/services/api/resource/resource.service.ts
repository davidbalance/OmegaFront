import { ResourceAPI } from "@/services/endpoints";
import { AbstractService } from "../abstract.service";
import { FindResourcesRS, Resource } from "./dtos";
import { OmegaFetch } from "@/services/config";
import { IFindService } from "@/services/interfaces";

export class ResourceService
    extends AbstractService<ResourceAPI>
    implements IFindService<any, Resource> {

    async find(): Promise<Resource[]> {
        try {
            const { resources }: FindResourcesRS = await OmegaFetch.get({ url: this.endpoints.FIND });
            return resources;
        } catch (error) {
            throw error;
        }
    }

    findOne(params: any): Promise<Resource> {
        throw new Error("Method not implemented.");
    }

}