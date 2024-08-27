import OmegaClientBase from "./omega-client-base"

const omega = (): OmegaClientBase => {
    if (typeof window !== 'undefined') {
        throw new Error('OmegaClientBase can only be instantiated on the server.');
    }
    const omegaClient = new OmegaClientBase(process.env.NEXT_PUBLIC_ROOT_API || '');
    return omegaClient;
}

export default omega;