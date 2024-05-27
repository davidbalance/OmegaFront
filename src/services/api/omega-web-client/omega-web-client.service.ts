import { AbstractService } from "../abstract.service";
import { OmegaFetch } from "@/services/config";
import { Configuration } from "@/lib";
import { OmegaWebClientAPI } from "@/services/endpoints";
import { IFindService } from "@/services/interfaces";
import { FindOmegaWebClient } from "./dtos";

export class OmegaWebClientService
    extends AbstractService<OmegaWebClientAPI>
    implements IFindService<any, Configuration> {

    find(): FindOmegaWebClient[] | Promise<FindOmegaWebClient[]>;
    find(params: any): FindOmegaWebClient[] | Promise<FindOmegaWebClient[]>;
    find(params?: unknown): FindOmegaWebClient[] | Promise<FindOmegaWebClient[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(params: any): Promise<FindOmegaWebClient> {
        try {
            const client: FindOmegaWebClient = await OmegaFetch.get({ url: this.endpoints.FIND_ONE });
            return client;
        } catch (error) {
            throw error;
        }
    }

    async assignLogo({ logo, user }: { user: number, logo: number }): Promise<void> {
        try {
            await OmegaFetch.patch({
                url: this.endpoints.UPDATE_ONE_LOGO(`${user}`),
                body: { logo }
            });
        } catch (error) {
            throw error;
        }
    }

}