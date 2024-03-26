import { removeConfiguration, setConfiguration } from "@/lib/configuration.lib";
import { AbstractService } from "./abstract.service";
import { OmegaFetch } from "./config";
import { WebAppConfigurationAPI } from "./endpoints/endpoint.type";

export class WebAppConfigurationService extends AbstractService<WebAppConfigurationAPI>{

    async initializeConfiguration(): Promise<void> {
        try {
            const configuration: any = await OmegaFetch.get({ url: this.endpoints.CONFIGURATION });
            setConfiguration(configuration.client);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    cleanupConfiguration(): void {
        removeConfiguration();
    }
}