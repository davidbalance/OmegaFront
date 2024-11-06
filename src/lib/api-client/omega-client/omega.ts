import backendConfig from "@/config/backend.config";
import OmegaClientBase from "./omega-client-base"

const omega = (): OmegaClientBase => {
    if (typeof window !== 'undefined') {
        throw new Error('OmegaClientBase can only be instantiated on the server.');
    }
    const omegaClient = new OmegaClientBase(backendConfig.uri);
    return omegaClient;
}

export default omega;