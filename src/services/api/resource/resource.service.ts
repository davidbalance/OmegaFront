import { IFindService, ResourceAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindResourcesRS, Resource } from "./dtos";
import { OmegaFetch } from "@/services/config";

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