import { IFindService, OmegaWebClientAPI } from "@/services";
import { AbstractService } from "../abstract.service";
import { FindOmegaWebClient, OmegaWebClient } from "./dtos";
import { OmegaFetch } from "@/services/config";

export class OmegaWebClientService
    extends AbstractService<OmegaWebClientAPI>
    implements IFindService<any, OmegaWebClient>{

    find(): OmegaWebClient[] | Promise<OmegaWebClient[]>;
    find(params: any): OmegaWebClient[] | Promise<OmegaWebClient[]>;
    find(params?: unknown): OmegaWebClient[] | Promise<OmegaWebClient[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(params: any): Promise<OmegaWebClient> {
        try {
            const { client }: FindOmegaWebClient = await OmegaFetch.get({ url: this.endpoints.FIND_ONE });
            return client;
        } catch (error) {
            throw error;
        }
    }

}